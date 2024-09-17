import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearOrdersState, getAllOrders } from '../redux/slices/orders';
import ShoppingLoader from '../Component/Loader/ShoppingLoader';

const OrderList = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await dispatch(getAllOrders());
            setData(response.payload.orders.items)
            setLoading(false)
        }
        fetchData()

    }, []);

    if (loading) {
        return <ShoppingLoader />
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const amountPrint = (price) => {
        if (typeof price !== 'undefined' && price !== null) {
            const formattedPrice = "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            return formattedPrice;
        } else {
            return "₹0.00"; // Or any default value you prefer
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'PaymentAuthorized':
                return 'bg-blue-500';
            case 'Cancelled':
                return 'bg-red-500';
            default:
                return 'bg-black';
        }
    };

    if (data.length === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                    You have no orders!
                </h1>
                {/* <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem' }}>
                    Why not place your first order today?
                </p> */}
                <button onClick={() => navigate('/')} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Go to Shop
                </button>
            </div>
        );
    }



    return (
        <div className="w-full mt-10 px-5 py-5 mx-auto font-sans">
            <h2 className="text-2xl mb-5 font-bold md:text-xl md:mb-2">My Recent Orders</h2>
            <table className="w-full border-collapse text-sm md:text-xs">
                <thead>
                    <tr>
                        <th className="p-3 text-left border-b bg-gray-200 md:p-2">Order</th>
                        <th className="p-3 text-left border-b bg-gray-200 md:p-2">Placed On</th>
                        <th className="p-3 text-left border-b bg-gray-200 md:p-2">Total</th>
                        <th className="p-3 text-left border-b bg-gray-200 md:p-2">Order Status</th>
                        <th className="p-3 text-left border-b bg-gray-200 md:p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((el, index) => (
                        <tr key={index}>
                            <td className="p-3 text-left border-b md:p-2">{el?.id}</td>
                            <td className="p-3 text-left border-b md:p-2">{formatDate(el?.orderPlacedAt)}</td>
                            <td className="p-3 text-left border-b md:p-2">{amountPrint(el?.totalWithTax)}</td>
                            <td className="p-3 text-left border-b md:p-2">
                                <span className={`text-white px-2 py-1 rounded ${getStatusColor(el?.state)}`}>
                                    {el?.state}
                                </span>
                            </td>
                            <td className="p-3 text-left border-b md:p-2">
                                <Link to={`/order/${el?.id}`} className="underline text-blue-600 hover:text-red-600">
                                    View details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
