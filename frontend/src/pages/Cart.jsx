import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, updateCart } from "../store/slices/cartSlice";
import CartTotal from "../components/CartTotal";

function Cart () {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartData = useSelector((state) => state.cart.cartItems);
  const currency = useSelector((state) => state.ui.currency);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch])

  const updateQuantity = (productId, size, quantity) => {
    dispatch(updateCart({itemId: productId, size, quantity}));
  }

  return (
    <section className="border-t border-stone-200/80 pt-12 sm:pt-14 section-shell px-1 sm:px-2">
      <div className="text-2xl mb-8">
        <Title text1={"YOUR"} text2={`CART`} />
      </div>

      {cartData.length === 0 ? (
        // Empty Cart State
        <div className="surface-card flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
          <p className="text-gray-500 mb-6 max-w-md text-sm sm:text-base leading-relaxed">Looks like you haven't added anything to your cart yet. Start shopping to fill it up!</p>
          <button
            onClick={() => navigate('/collection')}
            className="btn-primary px-8 py-3"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="surface-card overflow-hidden">
            {cartData.map((item) => (
                <div
                  key={item.productId + item.size}
                  className="py-5 sm:py-6 px-3.5 sm:px-6 border-b border-stone-200/80 last:border-b-0 text-gray-700 grid grid-cols-[4fr_0.8fr_0.6fr] sm:grid-cols-[4fr_2fr_0.8fr] items-center gap-3 sm:gap-4 hover:bg-stone-50/70 transition-colors duration-200 group"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="relative overflow-hidden rounded-xl border border-stone-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <img
                        src={item.image}
                        className="w-20 sm:w-24 object-cover transition-transform duration-300 group-hover:scale-110"
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <p className="text-lg font-bold text-orange-600 leading-none">
                          {currency}{item.price}
                        </p>
                        <span className="px-3 py-1 border border-stone-200 bg-linear-to-br from-gray-50 to-white rounded-lg text-xs sm:text-sm font-semibold text-gray-700 shadow-sm">
                          Size: {item.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <input
                    onChange={(e) =>
                    updateQuantity(
                      item.productId,
                      item.size,
                      Number(e.target.value)
                    )
                  }
                    className="border border-stone-300 rounded-xl max-w-16 sm:max-w-20 px-2 sm:px-3 py-2 text-center font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 hover:border-stone-400 bg-white min-h-11"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  
                  <button
                    onClick={() => updateQuantity(item.productId, item.size, 0)}
                    className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-red-50 transition-all duration-300 group/btn ml-auto border border-transparent hover:border-red-100"
                    title="Remove item"
                  >
                    <img
                      className="w-5 opacity-60 group-hover/btn:opacity-100 transition-opacity duration-200 group-hover/btn:scale-110 transform"
                      src={assets.bin_icon}
                      alt=""
                    />
                  </button>
                </div>
              
            ))}
          </div>

          <div className="flex justify-end my-14 sm:my-18">
            <div className="w-full sm:w-120">
              <CartTotal />
              <div className="w-full text-end mt-7 sm:mt-8">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-linear-to-r from-gray-900 to-black text-white text-sm font-bold px-10 py-4 rounded-xl hover:from-black hover:to-gray-800 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-[0.12em] min-h-11"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;