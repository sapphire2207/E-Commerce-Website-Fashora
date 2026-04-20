import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyStripeOrder } from "../store/slices/orderSlice";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      if (success === "true" && orderId) {
        await dispatch(verifyStripeOrder({ orderId }));
        navigate("/orders"); 
      } else {
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [success, orderId, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="surface-card w-full max-w-md p-7 sm:p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin" />
        <p className="prata-regular text-3xl text-gray-900 mt-6">Verifying Payment</p>
        <p className="text-sm sm:text-base text-gray-500 mt-2 leading-relaxed">
          Please wait while we confirm your payment and finalize your order.
        </p>

        <div className="mt-6 h-2 rounded-full bg-stone-100 overflow-hidden">
          <div className="h-full w-2/3 bg-linear-to-r from-orange-500 to-orange-600 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Verify;