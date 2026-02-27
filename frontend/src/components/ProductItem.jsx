import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductItem({ id, image, name, price }) {
  const currency = useSelector((state) => state.ui.currency);

  return (
    <Link className="text-gray-700 cursor-pointer group" to={`/product/${id}`}>
      <div className="overflow-hidden bg-gray-100 rounded-xl shadow-sm group-hover:shadow-xl transition-all duration-500 border-2 border-transparent group-hover:border-orange-200">
          <img
            src={image}
            className="group-hover:scale-110 transition-all ease-in-out duration-500 w-full"
            alt={name}
          />
      </div>
      <p className="pt-4 pb-1 text-sm font-medium group-hover:text-orange-600 transition-colors duration-300">
        {name}
      </p>
      <p className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductItem;
