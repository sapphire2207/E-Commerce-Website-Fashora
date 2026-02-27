import { useSelector } from "react-redux";
import Title from "./Title";

function CartTotal() {
  const currency = useSelector((state) => state.ui.currency);
  const deliveryFee = useSelector((state) => state.ui.deliveryFee);
  const cartTotal = useSelector((state) => state.cart.cartTotal) || 0;

  return (
    <div className="w-full bg-linear-to-br from-white to-gray-50 rounded-xl shadow-lg border-2 border-gray-100 p-6 sm:p-8">
      <div className="text-2xl mb-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-4 text-sm">
        <div className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 font-medium">Subtotal</p>
          <p className="font-bold text-gray-900">
            {currency} {cartTotal}.00
          </p>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>

        <div className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 font-medium">Shipping Fee</p>
          <p className="font-bold text-gray-900">
            {currency} {deliveryFee}.00
          </p>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>

        <div className="flex justify-between items-center py-4 px-4 bg-linear-to-r from-orange-500 to-orange-600 rounded-lg shadow-md mt-2">
          <b className="text-white text-base">Total</b>
          <b className="text-white text-xl">
            {currency} {cartTotal === 0 ? 0 : cartTotal + deliveryFee}.00
          </b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
