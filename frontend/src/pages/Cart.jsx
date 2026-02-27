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
    <div className="border-t border-gray-100 pt-14 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-2xl mb-8">
        <Title text1={"YOUR"} text2={`CART`} />
      </div>

      {cartData.length === 0 ? (
        // Empty Cart State
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
          <p className="text-gray-500 mb-6 max-w-md">Looks like you haven't added anything to your cart yet. Start shopping to fill it up!</p>
          <button
            onClick={() => navigate('/collection')}
            className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {cartData.map((item) => (
                <div
                  key={item.productId + item.size}
                  className="py-6 px-4 sm:px-6 border-b border-gray-100 last:border-b-0 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
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
                        <p className="text-lg font-bold text-orange-600">
                          {currency}{item.price}
                        </p>
                        <span className="px-3 py-1 border-2 border-gray-200 bg-linear-to-br from-gray-50 to-white rounded-lg text-sm font-medium text-gray-700 shadow-sm">
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
                    className="border-2 border-gray-200 rounded-lg max-w-16 sm:max-w-20 px-2 sm:px-3 py-2 text-center font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 hover:border-gray-300"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  
                  <button
                    onClick={() => updateQuantity(item.productId, item.size, 0)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 transition-all duration-300 group/btn ml-auto"
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

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-120">
              <CartTotal />
              <div className="w-full text-end mt-8">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-linear-to-r from-gray-900 to-black text-white text-sm font-bold px-10 py-4 rounded-lg hover:from-black hover:to-gray-800 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;