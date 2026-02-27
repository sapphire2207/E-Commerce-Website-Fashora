import { assets } from "../assets/assets";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/slices/productSlice";
import useImagePreview from "../hooks/useImagePreview";
import { toast } from "react-toastify";

const productSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    description: z.string().min(5, "Description is required"),
    price: z.coerce.number().min(1, "Price must be greater than 0"),
    category: z.string(),
    subCategory: z.string(),
    bestSeller: z.boolean(),
    sizes: z.array(z.string()).min(1, "Select at least one size"),
    image1: z.any().optional(),
    image2: z.any().optional(),
    image3: z.any().optional(),
    image4: z.any().optional(),
  })
  .refine(
    (data) =>
      data.image1 instanceof File ||
      data.image2 instanceof File ||
      data.image3 instanceof File ||
      data.image4 instanceof File,
    {
      message: "At least one image is required",
      path: ["image1"],
    },
  );

function Add() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products?.error);
  const loading = useSelector((state) => state.products.loading);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
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

  const onSubmitHandler = async (data) => {
    try {
      await dispatch(addProduct({ productData: data })).unwrap();

      toast.success("Product added successfully 🚀");

      reset({
        name: "",
        description: "",
        price: "",
        category: "Men",
        subCategory: "Topwear",
        bestSeller: false,
        sizes: [],
        image1: undefined,
        image2: undefined,
        image3: undefined,
        image4: undefined,
      });
    } catch (err) {
      toast.error(err || "Something went wrong ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="bg-linear-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl w-full max-w-4xl flex flex-col gap-7 border-2 border-gray-100"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-linear-to-b from-orange-500 to-orange-600 rounded-full"></span>
          Add New Product
        </h2>
        <p className="text-gray-500 text-sm mt-2 ml-7">
          Fill in the details to add a new product to your store
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <p className="font-bold mb-4 text-gray-900 flex items-center gap-2">
          <span className="text-orange-600">📸</span> Upload Images
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[preview1, preview2, preview3, preview4].map((preview, i) => (
            <label
              key={i}
              htmlFor={`image${i + 1}`}
              className="cursor-pointer group"
            >
              <div className="border-2 border-dashed border-gray-300 rounded-xl bg-white overflow-hidden hover:border-orange-400 hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative">
                <img
                  className="w-full h-32 object-contain p-3"
                  src={!preview ? assets.upload_area : preview}
                  alt=""
                />
                {preview && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                    ✓
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-2 text-gray-500 group-hover:text-orange-600 transition-colors">
                {!preview ? `Image ${i + 1}` : "Uploaded"}
              </p>
              <input
                hidden
                type="file"
                accept="image/*"
                id={`image${i + 1}`}
                {...register(`image${i + 1}`)}
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
          className="w-full max-w-md border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white hover:border-gray-300"
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
          className="w-full max-w-md border-2 border-gray-200 rounded-xl px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white hover:border-gray-300"
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
            className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white hover:border-gray-300 cursor-pointer font-medium"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-3 font-bold text-gray-900">Sub Category</p>
          <select
            {...register("subCategory")}
            className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white hover:border-gray-300 cursor-pointer font-medium"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-3 font-bold text-gray-900">Price</p>
          <input
            {...register("price")}
            className="border-2 border-gray-200 rounded-xl px-4 py-3 w-36 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white hover:border-gray-300 font-semibold"
            type="number"
            placeholder="₹25"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-2">{errors.price.message}</p>
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
                    ? "bg-linear-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-lg scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50 hover:scale-105"
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
      <div className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all duration-300">
        <input
          type="checkbox"
          id="bestSeller"
          {...register("bestSeller")}
          className="w-5 h-5 accent-orange-500 cursor-pointer"
        />
        <label
          htmlFor="bestSeller"
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
        disabled={loading}
        className="w-full md:w-48 py-4 bg-linear-to-r from-gray-900 to-black text-white rounded-xl font-bold
                   hover:from-black hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl
                   hover:scale-105 active:scale-95 uppercase tracking-wider"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}

export default Add;
