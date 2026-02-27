import Title from "./Title";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

function BestSeller() {
  const bestSeller = useSelector((state) => state.products.bestSellers);

  return (
    <div className="my-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-sm sm:text-base md:text-lg text-gray-500 mt-4 max-w-2xl leading-relaxed">
          Best Sellers You Can't Resist – Grab Yours Today!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
