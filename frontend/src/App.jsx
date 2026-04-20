import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Notifications from "./pages/Notification";
import Verify from "./pages/Verify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/slices/authSlice";
import { connectSocket, disconnectSocket } from "./store/slices/socketSlice";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.status);
  const userId = useSelector(
    (state) => state.auth.userData?._id || state.auth.userData?.id,
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && userId) {
      dispatch(connectSocket(userId));
      return;
    }

    dispatch(disconnectSocket());
  }, [dispatch, isLoggedIn, userId]);

  useEffect(() => {
    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  return (
    <div className="app-shell px-4 sm:px-[5vw] md:px-[6.5vw] lg:px-[8vw] 2xl:px-[10vw]">
      <ToastContainer position="top-right" autoClose={4000} newestOnTop theme="colored" />

      <Navbar />
      <SearchBar />

      <main className="page-enter pb-8 sm:pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
