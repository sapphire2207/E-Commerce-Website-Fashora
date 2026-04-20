import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductItem({ id, image, name, price }) {
  const currency = useSelector((state) => state.ui.currency);

  return (
    <Link
      className="text-gray-700 cursor-pointer group block rounded-[18px] focusable-ring"
      to={`/product/${id}`}
    >
      <article className="surface-card surface-card-hover p-2 sm:p-2.5">
        <div className="overflow-hidden bg-gray-100 rounded-[14px] border border-stone-100">
          <img
            src={image}
            className="group-hover:scale-[1.06] transition-all ease-in-out duration-500 w-full aspect-4/5 object-cover"
            alt={name}
          />
        </div>

        <div className="px-1 sm:px-2 py-3 sm:py-3.5">
          <p className="text-[0.83rem] sm:text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-300 min-h-10">
            {name}
          </p>
          <p className="text-base sm:text-lg font-extrabold text-gray-900 mt-1 group-hover:text-orange-600 transition-colors duration-300">
            {currency}
            {price}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ProductItem;
