import Title from "./Title";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

function BestSeller() {
  const bestSeller = useSelector((state) => state.products.bestSellers);

  return (
    <section className="my-14 sm:my-18 section-shell px-1 sm:px-2">
      <div className="text-center text-3xl py-7 sm:py-9">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-[92%] sm:w-3/4 m-auto text-sm sm:text-base md:text-lg text-gray-500 mt-5 max-w-2xl leading-relaxed">
          Best Sellers You Can't Resist – Grab Yours Today!
        </p>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 gap-y-6 sm:gap-y-8 md:gap-y-10">
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
    </section>
  );
}

export default BestSeller;
