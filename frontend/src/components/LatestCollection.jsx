import ProductItem from "./ProductItem";
import Title from "./Title";
import { useSelector } from "react-redux";

function LatestCollection() {
  const latestProducts = useSelector((state) => state.products.latestCollection);

  return (
    <section className="my-14 sm:my-18 section-shell px-1 sm:px-2">
      <div className="text-center py-7 sm:py-9 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-[92%] sm:w-3/4 m-auto text-sm sm:text-base md:text-lg text-gray-500 mt-5 max-w-2xl leading-relaxed">
          Upgrade Your Wardrobe with Our Trendiest and Newest Collection
        </p>
      </div>

      {/* Rendering products */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 gap-y-6 sm:gap-y-8 md:gap-y-10">
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
    </section>
  );
}

export default LatestCollection;
