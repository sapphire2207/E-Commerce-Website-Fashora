import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeCodOrder, placeStripeOrder } from "../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

const orderSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Enter valid email"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipcode: z.string().min(4, "Zipcode is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
});

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const payload = {
        items: cartItems,
        address: formData,
      };

      if (method === "cod") {
        const resultAction = await dispatch(placeCodOrder(payload));

        if (placeCodOrder.fulfilled.match(resultAction)) {
          navigate("/orders");
        }
      }

      if (method === "stripe") {
        const resultAction = await dispatch(placeStripeOrder(payload));

        if (placeStripeOrder.fulfilled.match(resultAction)) {
          const sessionUrl = resultAction.payload;
          window.location.replace(sessionUrl);
        }
      }
    } catch (error) {
      console.log("Place Order Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-100 max-w-7xl mx-auto py-4 sm:px-6"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-5 w-full sm:max-w-130">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="bg-linear-to-br from-white to-gray-50 p-6 sm:p-8 rounded-xl shadow-lg border-2 border-gray-100">
          <div className="flex gap-4 mb-5">
            <div className="flex-1 group">
              <input
                {...register("firstName")}
                type="text"
                placeholder="First Name"
                className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1 group">
              <input
                {...register("lastName")}
                type="text"
                placeholder="Last Name"
                className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <input
              {...register("street")}
              type="text"
              placeholder="Street Address"
              className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">
                {errors.street.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 mb-5">
            <input
              {...register("city")}
              type="text"
              placeholder="City"
              className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
            />
            <input
              {...register("state")}
              type="text"
              placeholder="State"
              className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
            />
          </div>

          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}

          <div className="flex gap-4 mb-5">
            <input
              {...register("zipcode")}
              type="number"
              placeholder="Zipcode"
              className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
            />
            <input
              {...register("country")}
              type="text"
              placeholder="Country"
              className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
            />
          </div>

          {errors.zipcode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.zipcode.message}
            </p>
          )}
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}

          <input
            {...register("phone")}
            type="number"
            placeholder="Phone Number"
            className="border-2 border-gray-200 rounded-lg py-3 px-4 w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-gray-300"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 mt-8 sm:mt-22.5">
        <div className="min-w-80 max-w-130">
          <CartTotal />
        </div>

        <div className="mt-12 max-w-130">
          <div className="mb-6">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          {/* Payment Methods */}
          <div className="flex gap-4 flex-col lg:flex-row mb-8">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border-2 p-4 px-5 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-md ${
                method === "stripe"
                  ? "border-orange-500 bg-orange-50 shadow-md scale-105"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="relative">
                <p
                  className={`min-w-4 h-4 border-2 rounded-full transition-all duration-300 ${
                    method === "stripe"
                      ? "bg-orange-500 border-orange-500 shadow-lg"
                      : "border-gray-300"
                  }`}
                ></p>
                {method === "stripe" && (
                  <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></span>
                )}
              </div>
              <img src={assets.stripe_logo} className="h-6 mx-2" alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border-2 p-4 px-5 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-md ${
                method === "cod"
                  ? "border-orange-500 bg-orange-50 shadow-md scale-105"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="relative">
                <p
                  className={`min-w-4 h-4 border-2 rounded-full transition-all duration-300 ${
                    method === "cod"
                      ? "bg-orange-500 border-orange-500 shadow-lg"
                      : "border-gray-300"
                  }`}
                ></p>
                {method === "cod" && (
                  <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></span>
                )}
              </div>
              <p
                className={`text-sm font-semibold mx-2 transition-colors duration-300 ${
                  method === "cod" ? "text-orange-700" : "text-gray-600"
                }`}
              >
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end">
            <button
              type="submit"
              className="bg-linear-to-r from-gray-900 to-black text-white px-12 py-4 text-sm font-bold rounded-xl hover:from-black hover:to-gray-800 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-2xl uppercase tracking-wider w-full sm:w-auto"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
