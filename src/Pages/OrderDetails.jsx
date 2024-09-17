// import React, { useEffect, useState } from "react";
// import { format } from "date-fns"; // For date formatting
// import { useDispatch } from "react-redux";
// import { getOrderDetails } from "../redux/slices/orders";
// import { useParams } from "react-router-dom";
// import { QRCodeCanvas } from "qrcode.react";
// import ShoppingLoader from "../Component/Loader/ShoppingLoader";

// const OrderDetails = () => {
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await dispatch(getOrderDetails(params.id));
//         setOrderData(response.payload.data.order);
//       } catch (error) {
//         console.error("Failed to fetch order details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [dispatch, params.id]);

//   if (loading) {
//     return <ShoppingLoader />;
//   }

//   if (!orderData) {
//     return <p>Failed to load order data</p>;
//   }

//   const {
//     id,
//     orderPlacedAt,
//     subTotalWithTax,
//     shippingWithTax,
//     totalWithTax,
//     currencyCode,
//     state,
//     lines,
//     shippingAddress,
//     billingAddress,
//   } = orderData;

//   return (
//     <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
//       {/* Order Details Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start mb-6">
//         <div className="md:ml-4 mt-4 md:mt-0">
//           <h1 className="text-2xl font-bold">Order Details</h1>
//           <h2 className="text-xl font-semibold">Order ID: {id}</h2>
//           <p className="text-gray-700">
//             Placed On:{" "}
//             {format(new Date(orderPlacedAt), "MMM dd, yyyy HH:mm:ss")}
//           </p>
//           <p className="text-gray-700">
//             Status:{" "}
//             <span
//               className={`font-bold ${
//                 state === "Cancelled" ? "text-red-600" : "text-green-600"
//               }`}
//             >
//               {state}
//             </span>
//           </p>
//         </div>
//         <div className="md:mr-4 mt-4 md:mt-0">
//           {/* QR code for the order ID */}
//           <QRCodeCanvas value={id} size={128} />
//         </div>
//       </div>

//       {/* Order Summary and Items */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Order Summary */}
//         <div className="bg-gray-100 p-4 rounded-lg h-full shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-2">
//             <p>
//               Subtotal (with Tax):{" "}
//               <span className="font-bold">
//                 {currencyCode} {subTotalWithTax.toFixed(2)}
//               </span>
//             </p>
//             <p>
//               Shipping (with Tax):{" "}
//               <span className="font-bold">
//                 {currencyCode} {shippingWithTax.toFixed(2)}
//               </span>
//             </p>
//             <p>
//               Total (with Tax):{" "}
//               <span className="font-bold">
//                 {currencyCode} {totalWithTax.toFixed(2)}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* Order Items */}
//         <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Order Items</h2>
//           {lines.map((line) => (
//             <div
//               key={line.id}
//               className="flex items-center bg-white p-3 mb-3 rounded-md shadow"
//             >
//               <img
//                 src={line.productVariant.featuredAsset.preview}
//                 alt={line.productVariant.name}
//                 className="w-16 h-16 object-cover rounded-md mr-4"
//               />
//               <div>
//                 <p className="text-lg font-semibold">
//                   {line.productVariant.name}
//                 </p>
//                 <p className="text-gray-700">Quantity: {line.quantity}</p>
//                 <p className="text-gray-700">
//                   Price (with Tax): {currencyCode}{" "}
//                   {line.linePriceWithTax.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Shipping and Billing Addresses */}
//       {shippingAddress.fullName && (
//         <div className="grid md:grid-cols-2 gap-6 mt-6">
//           {/* Shipping Address */}
//           <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//             <p className="font-bold mb-1">{shippingAddress?.fullName}</p>
//             <p>{shippingAddress?.phoneNumber}</p>
//             <p>
//               {shippingAddress?.streetLine1} {shippingAddress?.streetLine2}
//             </p>
//             <p>
//               {shippingAddress?.city}, {shippingAddress?.province}{" "}
//               {shippingAddress?.postalCode}
//             </p>
//             <p>{shippingAddress?.country}</p>
//           </div>

//           {/* Billing Address */}
//           <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
//             <p className="font-bold mb-1">{billingAddress.fullName}</p>
//             <p>{billingAddress.phoneNumber}</p>
//             <p>
//               {billingAddress.streetLine1} {billingAddress.streetLine2}
//             </p>
//             <p>
//               {billingAddress.city}, {billingAddress.province}{" "}
//               {billingAddress.postalCode}
//             </p>
//             <p>{billingAddress.country}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useEffect, useState } from "react";
import { format } from "date-fns"; // For date formatting
import { useDispatch } from "react-redux";
import { getOrderDetails } from "../redux/slices/orders";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import ShoppingLoader from "../Component/Loader/ShoppingLoader";
import { FaShippingFast, FaMoneyBillAlt } from "react-icons/fa"; // Import icons

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getOrderDetails(params.id));
        setOrderData(response.payload.data.order);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, params.id]);

  if (loading) {
    return <ShoppingLoader />;
  }

  if (!orderData) {
    return <p>Failed to load order data</p>;
  }

  const {
    id,
    orderPlacedAt,
    subTotalWithTax,
    shippingWithTax,
    totalWithTax,
    currencyCode,
    state,
    lines,
    shippingAddress,
    billingAddress,
  } = orderData;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-white shadow-2xl rounded-2xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Order Details
          </h1>
          <p className="text-lg text-gray-500 mt-1">
            Order ID: <span className="text-gray-700 font-medium">{id}</span>
          </p>
          <p className="text-lg text-gray-500">
            Placed on:{" "}
            <span className="text-gray-700">
              {format(new Date(orderPlacedAt), "MMMM dd, yyyy")}
            </span>
          </p>
          <p className="text-lg">
            Status:{" "}
            <span
              className={`${
                state === "Cancelled" ? "text-red-500" : "text-green-500"
              } font-bold`}
            >
              {state}
            </span>
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <QRCodeCanvas
            value={id}
            size={100}
            className="shadow-lg rounded-lg"
          />
        </div>
      </div>

      {/* Order Summary & Items */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaMoneyBillAlt className="mr-2 text-green-500" /> Order Summary
          </h2>
          <div className="space-y-2 text-lg">
            <p>
              <span className="font-medium">Subtotal (with Tax):</span>{" "}
              {currencyCode} {subTotalWithTax.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Shipping (with Tax):</span>{" "}
              {currencyCode} {shippingWithTax.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Total (with Tax):</span>{" "}
              {currencyCode} {totalWithTax.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Items</h2>
          {lines.map((line) => (
            <div
              key={line.id}
              className="flex items-center bg-gray-50 p-4 mb-4 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <img
                src={line.productVariant.featuredAsset.preview}
                alt={line.productVariant.name}
                className="w-16 h-16 object-cover rounded-md shadow-md"
              />
              <div className="ml-4">
                <p className="text-lg font-medium">
                  {line.productVariant.name}
                </p>
                <p className="text-sm text-gray-600">Qty: {line.quantity}</p>
                <p className="text-sm text-gray-600">
                  Price (with Tax): {currencyCode}{" "}
                  {line.linePriceWithTax.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping and Billing Addresses */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Shipping Address */}
        {shippingAddress.fullName && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaShippingFast className="mr-2 text-blue-500" /> Shipping Address
            </h2>
            <p className="font-medium text-lg mb-2">
              {shippingAddress.fullName}
            </p>
            <p className="text-gray-600">
              {shippingAddress.streetLine1}, {shippingAddress.streetLine2},{" "}
              {shippingAddress.city}, {shippingAddress.province},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
            <p className="text-gray-600">
              Phone: {shippingAddress.phoneNumber}
            </p>
          </div>
        )}

        {/* Billing Address */}
        {billingAddress.fullName && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaMoneyBillAlt className="mr-2 text-green-500" /> Billing Address
            </h2>
            <p className="font-medium text-lg mb-2">
              {billingAddress.fullName}
            </p>
            <p className="text-gray-600">
              {billingAddress.streetLine1}, {billingAddress.streetLine2},{" "}
              {billingAddress.city}, {billingAddress.province},{" "}
              {billingAddress.postalCode}, {billingAddress.country}
            </p>
            <p className="text-gray-600">Phone: {billingAddress.phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
