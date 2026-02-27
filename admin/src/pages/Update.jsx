import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "../store/slices/productSlice";
import useImagePreview from "../hooks/useImagePreview";
import { toast } from "react-toastify";

const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  category: z.string(),
  subCategory: z.string(),
  bestSeller: z.boolean(),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
  image1: z.instanceof(File).optional(),
  image2: z.instanceof(File).optional(),
  image3: z.instanceof(File).optional(),
  image4: z.instanceof(File).optional(),
});

function Update() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products?.error);
  const [oldImages, setOldImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      category: "Men",
      subCategory: "Topwear",
      bestSeller: false,
      sizes: [],
    },
  });

  const image1 = watch("image1");
  const image2 = watch("image2");
  const image3 = watch("image3");
  const image4 = watch("image4");
  const sizes = watch("sizes") || [];
  const preview1 = useImagePreview(image1);
  const preview2 = useImagePreview(image2);
  const preview3 = useImagePreview(image3);
  const preview4 = useImagePreview(image4);

  useEffect(() => {
    const loadProduct = async () => {
      const result = await dispatch(getProductById(id)).unwrap();

      reset({
        name: result.name,
        description: result.description,
        price: result.price,
        category: result.category,
        subCategory: result.subCategory,
        bestSeller: result.bestSeller,
        sizes: result.sizes,
      });

      setOldImages(result.images || []);
    };

    loadProduct();
  }, [id, dispatch, reset]);

  const onSubmit = async (data) => {
    try {
      const updated = await dispatch(
        updateProduct({
          productId: id,
          productData: data,
        }),
      ).unwrap();

      toast.success("Product updated successfully 🎉");

      setOldImages(updated.images || []);

      reset({
        ...data,
        image1: undefined,
        image2: undefined,
        image3: undefined,
        image4: undefined,
      });
    } catch (err) {
      toast.error(err || "Failed to update product ❌");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-linear-to-b from-purple-500 to-purple-600 rounded-full"></span>
          Update Product
        </h1>
        <p className="text-sm text-gray-500 mt-2 ml-7">
          Edit product details and images
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-linear-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl w-full max-w-4xl flex flex-col gap-7 border-2 border-gray-100"
      >
        {/* Image Upload */}
        <div>
          <p className="font-bold mb-4 text-gray-900 flex items-center gap-2">
            <span className="text-purple-600">🖼️</span> Product Images
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[preview1, preview2, preview3, preview4].map((preview, i) => (
              <label
                key={i}
                htmlFor={`image${i + 1}`}
                className="cursor-pointer group"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-xl bg-white overflow-hidden hover:border-purple-400 hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative">
                  <img
                    className="w-full h-32 object-contain p-3"
                    src={
                      preview
                        ? preview
                        : oldImages[i]?.url
                          ? oldImages[i].url
                          : assets.upload_area
                    }
                    alt=""
                  />
                  {(preview || oldImages[i]) && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                      ✓
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-2 text-gray-500 group-hover:text-purple-600 transition-colors">
                  {preview
                    ? "New Image"
                    : oldImages[i]
                      ? "Current"
                      : `Image ${i + 1}`}
                </p>
                <input
                  hidden
                  type="file"
                  id={`image${i + 1}`}
                  onChange={(e) =>
                    setValue(`image${i + 1}`, e.target.files?.[0], {
                      shouldValidate: true,
                    })
                  }
                />
              </label>
            ))}
          </div>
          {errors.image1 && (
            <p className="text-red-500 text-xs mt-3">{errors.image1.message}</p>
          )}
        </div>

        {/* Product Name */}
        <div>
          <p className="font-bold mb-3 text-gray-900">Product Name</p>
          <input
            {...register("name")}
            className="w-full max-w-md border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white hover:border-gray-300"
            type="text"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="font-bold mb-3 text-gray-900">Product Description</p>
          <textarea
            {...register("description")}
            className="w-full max-w-md border-2 border-gray-200 rounded-xl px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white hover:border-gray-300"
            placeholder="Write product details and features"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-2">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category Row */}
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="mb-3 font-bold text-gray-900">Category</p>
            <select
              {...register("category")}
              className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white hover:border-gray-300 cursor-pointer font-medium"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-3 font-bold text-gray-900">Sub Category</p>
            <select
              {...register("subCategory")}
              className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white hover:border-gray-300 cursor-pointer font-medium"
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-3 font-bold text-gray-900">Price</p>
            <input
              {...register("price")}
              className="border-2 border-gray-200 rounded-xl px-4 py-3 w-36 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white hover:border-gray-300 font-semibold"
              type="number"
              placeholder="₹25"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-2">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-3 font-bold text-gray-900">Available Sizes</p>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => {
                  const currentSizes = watch("sizes") || [];

                  if (currentSizes.includes(size)) {
                    setValue(
                      "sizes",
                      currentSizes.filter((s) => s !== size),
                      { shouldValidate: true },
                    );
                  } else {
                    setValue("sizes", [...currentSizes, size], {
                      shouldValidate: true,
                    });
                  }
                }}
                className={`px-6 py-2.5 rounded-xl cursor-pointer text-sm font-bold transition-all duration-300 border-2
                  ${
                    sizes.includes(size)
                      ? "bg-linear-to-r from-purple-500 to-purple-600 text-white border-purple-500 shadow-lg scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50 hover:scale-105"
                  }`}
              >
                {size}
              </div>
            ))}
          </div>
          {errors.sizes && (
            <p className="text-red-500 text-xs mt-2">{errors.sizes.message}</p>
          )}
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
          <input
            type="checkbox"
            id="bestseller"
            {...register("bestSeller")}
            className="w-5 h-5 accent-purple-500 cursor-pointer"
          />
          <label
            htmlFor="bestseller"
            className="cursor-pointer font-semibold text-gray-900 flex items-center gap-2"
          >
            <span>⭐</span> Add to Bestseller
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-48 py-4 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold
                     hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-2xl
                     hover:scale-105 active:scale-95 uppercase tracking-wider"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default Update;
