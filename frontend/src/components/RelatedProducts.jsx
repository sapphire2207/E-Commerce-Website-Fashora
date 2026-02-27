import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { getRelatedProducts } from "../store/slices/productSlice";

function RelatedProducts({ category, subCategory, productId }) {
  const dispatch = useDispatch();

  const relatedProducts = useSelector(
    (state) => state.products.relatedProducts,
  );

  useEffect(() => {
    if (category && subCategory && productId) {
      dispatch(getRelatedProducts({ category, subCategory, productId }));
    }
  }, [category, subCategory, productId]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.images[0].url}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
