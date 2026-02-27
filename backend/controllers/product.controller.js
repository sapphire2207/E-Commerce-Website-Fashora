import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {
  deleteOnCloudinary,
  uploadMultipleOnCloudinary,
} from "../utils/cloudinary.js";
import productModel from "../models/product.model.js";
import mongoose from "mongoose";

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestSeller } =
    req.body;

  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const imgs = [image1, image2, image3, image4].filter(
    (img) => img !== undefined,
  );

  let imagesUrl = await uploadMultipleOnCloudinary(imgs, "image");

  const productData = {
    name,
    description,
    category,
    price: Number(price),
    subCategory,
    bestSeller: bestSeller === "true" ? true : false,
    sizes: JSON.parse(sizes),
    images: imagesUrl,
    date: Date.now(),
  };

  const product = await productModel.create(productData);

  res.status(200).json(new ApiResponse(200, product, "New Product Added"));
});

const listProducts = asyncHandler(async (req, res) => {
  let {
    page = 1,
    limit = 10,
    query,
    category,
    subCategory,
    sortType = "relevant",
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  const pipeline = [];

  const matchStage = {};

  if (query && query.trim() !== "") {
    matchStage.$or = [
      { name: { $regex: query.trim(), $options: "i" } },
      { description: { $regex: query.trim(), $options: "i" } },
    ];
  }

  if (category && category !== "") {
    matchStage.category = {
      $in: category.split(",").map((c) => c.trim()),
    };
  }

  if (subCategory && subCategory !== "") {
    matchStage.subCategory = {
      $in: subCategory.split(",").map((s) => s.trim()),
    };
  }

  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  let sortStage = { date: -1 };

  if (sortType === "low-high") {
    sortStage = { price: 1 };
  } else if (sortType === "high-low") {
    sortStage = { price: -1 };
  }

  pipeline.push({ $sort: sortStage });

  const aggregate = productModel.aggregate(pipeline);

  const options = {
    page,
    limit,
  };

  const products = await productModel.aggregatePaginate(aggregate, options);

  return res
    .status(200)
    .json(
      new ApiResponse(200, products, "All Products Data Fetched Successfully"),
    );
});

const removeProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid Product ID");
  }

  const product = await productModel.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product Not Found");
  }

  if (product.images && product.images.length > 0) {
    for (const img of product.images) {
      if (img.public_id) {
        await deleteOnCloudinary(img.public_id, "image");
      }
    }
  }

  await productModel.findByIdAndDelete(productId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedProduct: product },
        "Product Removed Successfully",
      ),
    );
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid Product ID");
  }

  const product = await productModel.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Data Fetched Successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid Product ID");
  }

  const existingProduct = await productModel.findById(productId);

  if (!existingProduct) {
    throw new ApiError(404, "Product Not Found");
  }

  const { name, description, price, category, subCategory, sizes, bestSeller } =
    req.body;

  if (name) existingProduct.name = name;
  if (description) existingProduct.description = description;
  if (category) existingProduct.category = category;
  if (subCategory) existingProduct.subCategory = subCategory;
  if (price) existingProduct.price = Number(price);
  if (sizes) existingProduct.sizes = JSON.parse(sizes);

  if (bestSeller !== undefined) {
    existingProduct.bestSeller = bestSeller === true || bestSeller === "true";
  }

  if (req.files && Object.keys(req.files).length > 0) {
    const updatedImages = [...existingProduct.images];

    for (const key in req.files) {
      const file = req.files[key][0];

      const index = Number(key.replace("image", "")) - 1;

      if (updatedImages[index]?.public_id) {
        await deleteOnCloudinary(updatedImages[index].public_id, "image");
      }

      const uploaded = await uploadMultipleOnCloudinary([file], "image");

      updatedImages[index] = uploaded[0];
    }

    existingProduct.images = updatedImages;
  }

  await existingProduct.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, existingProduct, "Product updated successfully"),
    );
});

const getHomeProducts = asyncHandler(async (req, res) => {
  const latest = await productModel.aggregate([
    { $sample: { size: 10 } },
    {
      $project: {
        _id: 1,
        name: 1,
        price: 1,
        category: 1,
        subCategory: 1,
        image: { $arrayElemAt: ["$images.url", 0] },
      },
    },
  ]);

  const latestIds = latest.map((p) => p._id);

  const bestSellers = await productModel.aggregate([
    {
      $match: {
        bestSeller: true,
        _id: { $nin: latestIds },
      },
    },
    { $sample: { size: 5 } },
    {
      $project: {
        _id: 1,
        name: 1,
        price: 1,
        category: 1,
        subCategory: 1,
        image: { $arrayElemAt: ["$images.url", 0] },
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        latestCollection: latest,
        bestSellers: bestSellers,
      },
      "Home Products Fetched",
    ),
  );
});

const getRelatedProducts = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  let { category, subCategory } = req.query;

  const relatedProducts = await productModel
    .find(
      {
        category,
        subCategory,
        _id: { $ne: productId },
      },
      {
        name: 1,
        price: 1,
        images: 1,
      },
    )
    .limit(5);

  return res
    .status(200)
    .json(new ApiResponse(200, relatedProducts, "Related Products Fetched"));
});

export {
  listProducts,
  addProduct,
  removeProduct,
  getProductById,
  updateProduct,
  getHomeProducts,
  getRelatedProducts,
};
