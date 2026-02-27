import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import userModel from "../models/user.model.js";

import mongoose from "mongoose";

const buildCartPipeline = (userId) => [
  {
    $match: { _id: new mongoose.Types.ObjectId(userId) },
  },

  {
    $unwind: {
      path: "$cartItems",
      preserveNullAndEmptyArrays: true,
    },
  },

  {
    $lookup: {
      from: "products",
      localField: "cartItems.product",
      foreignField: "_id",
      as: "product",
    },
  },

  {
    $unwind: {
      path: "$product",
      preserveNullAndEmptyArrays: true,
    },
  },
  
  {
    $match: {
      $or: [{ product: { $ne: null } }, { cartItems: null }],
    },
  },

  {
    $project: {
      _id: 0,
      productId: "$product._id",
      name: "$product.name",
      price: "$product.price",
      image: {
        $ifNull: [
          { $arrayElemAt: ["$product.images.url", 0] },
          "",
        ],
      },
      size: "$cartItems.size",
      quantity: "$cartItems.quantity",
      totalPrice: {
        $multiply: ["$product.price", "$cartItems.quantity"],
      },
    },
  },
  {
  $match: {
    productId: { $ne: null }
  }
},
  {
    $group: {
      _id: null,
      items: { $push: "$$ROOT" },
      cartTotal: { $sum: "$totalPrice" },
      cartCount: { $sum: "$quantity" },
    },
  },
];

const getCartSnapshot = async (userId) => {
  const result = await userModel.aggregate(buildCartPipeline(userId));
  return result[0] || { items: [], cartTotal: 0, cartCount: 0 };
};

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { itemId, size } = req.body;

  if (!itemId || !size) {
    throw new ApiError(400, "Item ID And Size Are Required");
  }

  const user = await userModel.findById(userId);

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  const existingItem = user.cartItems.find(
    (item) => item.product.toString() === itemId && item.size === size,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user.cartItems.push({
      product: itemId,
      size,
      quantity: 1
    });
  }

   await user.save();

  const cart = await getCartSnapshot(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Product Added To Cart"));
});

const updateCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { itemId, size, quantity } = req.body;

  if (!itemId || !size || quantity === undefined) {
    throw new ApiError(400, "Item ID, Size And Quantity Are Required");
  }

  if (quantity < 0) {
    throw new ApiError(400, "Quantity Cannot Be Negative");
  }

  const user = await userModel.findById(userId);

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  const itemIndex = user.cartItems.findIndex(
    item => item.product.toString() === itemId && item.size === size
  );

  if (itemIndex === -1)
    throw new ApiError(404, "Item not found in cart");

  if (quantity === 0) {
    user.cartItems.splice(itemIndex, 1);
  } else {
    user.cartItems[itemIndex].quantity = quantity;
  }

  await user.save();

  const cart = await getCartSnapshot(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart Updated Successfully"));
});

const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await getCartSnapshot(userId);

  return res.status(200).json(
    new ApiResponse(200, cart, "User cart fetched successfully")
  );
});

export { addToCart, updateCart, getUserCart };