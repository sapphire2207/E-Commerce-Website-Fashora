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
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium">Verifying payment...</p>
    </div>
  );
};

export default Verify;