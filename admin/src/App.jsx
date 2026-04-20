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
      <div className="admin-shell flex items-center justify-center px-4">
        <div className="admin-card w-full max-w-md text-center py-10 px-8">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin mb-4" />
          <p className="text-lg font-semibold text-gray-800">
            Checking authentication...
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Loading your admin workspace
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnHover
        pauseOnFocusLoss
        newestOnTop
        theme="colored"
      />

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
              <div className="section-shell px-3 sm:px-4 lg:px-6 xl:px-8">
                <Navbar />
                <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 lg:gap-5 py-3 sm:py-4">
                  <Sidebar />
                  <main className="flex-1 min-w-0 text-gray-700 text-base pb-6 sm:pb-10">
                    <Outlet />
                  </main>
                </div>
              </div>
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
