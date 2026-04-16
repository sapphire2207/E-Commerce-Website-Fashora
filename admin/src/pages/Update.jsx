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
import { startAIJob, resetAI } from "../store/slices/aiSlice";
import useAI from "../hooks/useAI";
import { uploadTempImages } from "../helpers/uploadApi";
import { Loader2, Sparkles } from "lucide-react";

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
  const { status, result } = useAI();
  const [aiType, setAiType] = useState(null);
  const aiLoading = useSelector((state) => state.ai.loading);
  const aiError = useSelector((state) => state.ai.error);
  const aiBusy = aiLoading || status === "pending" || status === "processing";

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

  const handleGenerate = async (type) => {
    const currentImages = [image1, image2, image3, image4];
    const selectedEntries = currentImages
      .map((file, index) => ({ file, index }))
      .filter(({ file }) => file instanceof File);

    const hasExistingImages = oldImages.some(
      (img) => img?.url && img?.public_id,
    );

    if (selectedEntries.length === 0 && !hasExistingImages) {
      setAiType(null);
      toast.error("Upload images first");
      return;
    }

    try {
      let uploadedImages = [];

      if (selectedEntries.length > 0) {
        const formData = new FormData();
        selectedEntries.forEach(({ file }) => {
          formData.append("images", file);
        });

        const res = await uploadTempImages(formData);
        uploadedImages = res.data.data || [];
      }

      const uploadedByIndex = selectedEntries.reduce((acc, entry, idx) => {
        acc[entry.index] = uploadedImages[idx];
        return acc;
      }, {});

      const mergedImages = [0, 1, 2, 3]
        .map((index) => uploadedByIndex[index] || oldImages[index])
        .filter((img) => img?.url && img?.public_id);

      if (mergedImages.length === 0) {
        setAiType(null);
        toast.error("Upload images first");
        return;
      }

      setAiType(type);
      await dispatch(startAIJob({ type, images: mergedImages })).unwrap();
    } catch (err) {
      setAiType(null);
      toast.error(err || "Failed to start AI job ❌");
    }
  };

  useEffect(() => {
    if (status === "completed" && result?.trim()) {
      if (aiType === "name") {
        setValue("name", result);
      } else {
        setValue("description", result);
      }

      toast.success("AI generated ✨");
      dispatch(resetAI());
    }
  }, [status, result, aiType, setValue, dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(aiError || "AI generation failed!");
      dispatch(resetAI());
    }
  }, [status, aiError, dispatch]);

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
          <div className="flex items-center gap-2 mb-3">
            <p className="font-bold text-gray-900">Product Name</p>
            <button
              type="button"
              disabled={aiBusy}
              onClick={() => handleGenerate("name")}
              className="group relative inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-purple-50 hover:text-gray-700 transition-all disabled:opacity-50"
              aria-label="Generate with AI"
            >
              {aiBusy && aiType === "name" ? (
                <Loader2 size={13} strokeWidth={2.25} className="animate-spin" />
              ) : (
                <Sparkles size={13} strokeWidth={2.25} />
              )}
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-purple-200 bg-white px-2.5 py-1 text-xs font-medium text-purple-700 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                Generate with AI
              </span>
            </button>
          </div>
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
          <div className="flex items-center gap-2 mb-3">
            <p className="font-bold text-gray-900">Product Description</p>
            <button
              type="button"
              disabled={aiBusy}
              onClick={() => handleGenerate("description")}
              className="group relative inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-purple-50 hover:text-gray-700 transition-all disabled:opacity-50"
              aria-label="Generate with AI"
            >
              {aiBusy && aiType === "description" ? (
                <Loader2 size={13} strokeWidth={2.25} className="animate-spin" />
              ) : (
                <Sparkles size={13} strokeWidth={2.25} />
              )}
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-purple-200 bg-white px-2.5 py-1 text-xs font-medium text-purple-700 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                Generate with AI
              </span>
            </button>
          </div>
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
