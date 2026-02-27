import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import RelatedProducts from "../components/RelatedProducts";
import { getProductById } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";

function Product() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productData = useSelector((state) => state.products.product);
  const currency = useSelector((state) => state.ui.currency);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const productImages = productData?.images?.map((img) => img.url) || [];

  useEffect(() => {
    if (productData?.images?.length > 0) {
      setImage(productData.images[0].url);
    }
  }, [productData]);

  return productData ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-8 sm:gap-12 flex-col sm:flex-row max-w-7xl mx-auto px-4 sm:px-6">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-3 pb-2 sm:pb-0">
            {productImages.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer rounded-lg border-2 transition-all duration-300 hover:border-gray-400 hover:scale-105 ${image === item ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-200"}`}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] group">
            <img
              className="w-full h-auto rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
              src={image}
              alt=""
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 animate-fadeIn">
          <h1 className="font-bold text-3xl mt-2 text-gray-900 leading-tight">
            {productData.name}
          </h1>

          <div className="flex items-center gap-1 mt-4 bg-linear-to-r from-orange-50 to-transparent w-fit px-3 py-2 rounded-lg">
            <img src={assets.star_icon} alt="" className="w-4 animate-pulse" />
            <img
              src={assets.star_icon}
              alt=""
              className="w-4 animate-pulse delay-75"
            />
            <img
              src={assets.star_icon}
              alt=""
              className="w-4 animate-pulse delay-150"
            />
            <img
              src={assets.star_icon}
              alt=""
              className="w-4 animate-pulse delay-200"
            />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className="pl-2 text-sm font-medium text-gray-600">
              (79 reviews)
            </p>
          </div>

          <div className="mt-6 bg-linear-to-br from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl shadow-md w-fit">
            <p className="text-sm font-medium opacity-90">Price</p>
            <p className="text-4xl font-bold">
              {currency}
              {productData.price}
            </p>
          </div>

          <p className="mt-6 text-gray-600 md:w-4/5 leading-relaxed text-base">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="font-semibold text-gray-800 text-lg">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border-2 py-3 px-5 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${item == size ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-200 scale-105" : "border-gray-300 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50"}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => dispatch(addToCart({ itemId: productData._id, size }))}
            className="bg-linear-to-r from-gray-900 to-black text-white px-10 py-4 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 hover:from-black hover:to-gray-800 uppercase tracking-wider"
          >
            Add to Cart
          </button>

          <hr className="mt-8 sm:w-4/5 border-gray-200" />

          <div className="text-sm text-gray-600 mt-6 flex flex-col gap-3 bg-gray-50 p-5 rounded-lg">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              100% Original product.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Cash on delivery is available on this product.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex border-b-2 border-gray-200">
          <b className="px-8 py-4 text-sm font-semibold text-gray-900 border-b-2 border-orange-500 -mb-0.5 cursor-pointer transition-all duration-300">
            Description
          </b>
          <p className="px-8 py-4 text-sm text-gray-500 cursor-pointer hover:text-gray-900 transition-colors duration-300">
            Reviews (79)
          </p>
        </div>
        <div className="flex flex-col gap-5 bg-linear-to-br from-gray-50 to-white border border-gray-200 px-8 py-8 text-sm text-gray-600 leading-relaxed rounded-b-xl shadow-sm">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        productId={productId}
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
