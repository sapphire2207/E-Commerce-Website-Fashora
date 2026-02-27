import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import Update from "./pages/Update";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAdminAuth } from "./store/slices/adminAuthSlice.js";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const { status, isAuthChecked } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    dispatch(checkAdminAuth());
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      <Routes>
        {/* LOGIN ROUTE */}
        <Route
          path="/login"
          element={!status ? <Login /> : <Navigate to="/list" replace />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <hr />
                <div className="flex w-full">
                  <Sidebar />
                  <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                    <Outlet />
                  </div>
                </div>
              </>
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
