import ProductItem from "./ProductItem";
import Title from "./Title";
import { useSelector } from "react-redux";

function LatestCollection() {
  const latestProducts = useSelector((state) => state.products.latestCollection);

  return (
    <div className="my-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-sm sm:text-base md:text-lg text-gray-500 mt-4 max-w-2xl leading-relaxed">
          Upgrade Your Wardrobe with Our Trendiest and Newest Collection
        </p>
      </div>

      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
