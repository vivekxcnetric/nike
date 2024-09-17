import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import PrivateRoute from "./PrivateRoute";
import ShoppingLoader from "../Component/Loader/ShoppingLoader";
import CartPage from "../Component/cart/CartPage";
import SignUp from "../Pages/SignUp";
import SingIn from "../Pages/SingIn";
import Order from "../Pages/Order";

import ProductDetails from "../Pages/ProductDetails";
import ProfilePage from "../Pages/Profile";
import OrderList from "../Pages/OrderList";
import OrderDetails from "../Pages/OrderDetails";
import ThankYouPage from "../Component/Checkout/ThankYouPage";
import FindLocation from "../Pages/FindLocation";
import App from "../Component/App";

const Checkout = lazy(() => import("../Pages/Checkout"));

const AllRoutes = () => {
  return (
    <Suspense fallback={<ShoppingLoader />}>
      <Routes>
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SingIn />} />

        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/location" element={<FindLocation />} />
        <Route path="/search" element={<App />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout/orderSummary" element={<Order />} />
        <Route
          path="/checkout/:step"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/success/:orderId"
          element={
            <PrivateRoute>
              <ThankYouPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/all-orders"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
