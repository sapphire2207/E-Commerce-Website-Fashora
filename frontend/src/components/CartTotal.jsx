import { useSelector } from "react-redux";
import Title from "./Title";

function CartTotal() {
  const currency = useSelector((state) => state.ui.currency);
  const deliveryFee = useSelector((state) => state.ui.deliveryFee);
  const cartTotal = useSelector((state) => state.cart.cartTotal) || 0;

  return (
    <section className="w-full surface-card p-5 sm:p-7">
      <div className="text-2xl mb-5 sm:mb-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-3.5 text-sm">
        <div className="flex justify-between items-center py-3.5 px-4 bg-white rounded-xl shadow-sm border border-stone-100">
          <p className="text-gray-600 font-medium tracking-wide">Subtotal</p>
          <p className="font-bold text-gray-900 text-base">
            {currency} {cartTotal}.00
          </p>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-stone-300 to-transparent"></div>

        <div className="flex justify-between items-center py-3.5 px-4 bg-white rounded-xl shadow-sm border border-stone-100">
          <p className="text-gray-600 font-medium tracking-wide">Shipping Fee</p>
          <p className="font-bold text-gray-900 text-base">
            {currency} {deliveryFee}.00
          </p>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-stone-300 to-transparent"></div>

        <div className="flex justify-between items-center py-4 px-4 bg-linear-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg mt-2">
          <b className="text-white text-base tracking-wide">Total</b>
          <b className="text-white text-2xl leading-none">
            {currency} {cartTotal === 0 ? 0 : cartTotal + deliveryFee}.00
          </b>
        </div>
      </div>
    </section>
  );
}

export default CartTotal;
