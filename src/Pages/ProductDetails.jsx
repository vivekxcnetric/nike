import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../redux/slices/productSlices";
import { useParams } from "react-router-dom";
// import { Toaster, toast } from 'react-hot-toast';
import ShoppingLoader from "../Component/Loader/ShoppingLoader";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/slices/addToCart";

const Option = (props) => {
  return (
    <div {...props.innerProps} className="flex items-center p-2">
      <img
        src={props.data.image}
        alt={props.data.label}
        className="w-16 h-16 object-cover rounded mr-2"
      />
      <span>{props.data.label}</span>
    </div>
  );
};

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const [variantData, setVariantData] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 100;
      containerRef.current.scrollBy({
        top: direction === "down" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getProductById(params.id));
        const product = response.payload.product;
        setProductData(product);
        setVariantData(product.variants[0]);
        setMainImage(product.variants[0]?.images[0]?.url);
      } catch (err) {
        setError("Failed to fetch product details");
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, params.id]);

  if (loading) return <ShoppingLoader />;
  if (error) return <div>{error}</div>;

  // Prepare options for react-select
  const variantOptions =
    productData?.variants?.map((variant) => ({
      value: variant.id,
      label: variant.name,
      image: variant.images[0]?.url,
    })) || [];

  //   const notify = () => toast.success("Product Added to Cart");
  const notify = () => {
    toast(
      <div className="flex items-center space-x-4">
        <img
          src={variantData?.images[0]?.url}
          alt={variantData?.name}
          className="w-16 h-16 object-cover rounded-lg shadow-lg border"
        />
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold text-gray-800">
            {variantData?.name}
          </h4>
          <p className="text-xs text-gray-500">Added to cart successfully!</p>
        </div>
      </div>,
      {
        className:
          "bg-white border border-gray-200 shadow-lg rounded-lg p-3 flex items-center",
        progressClassName: "bg-green-500",
      }
    );
  };

  const handleAddToCart = async () => {
    const data = {
      productVariantId: variantData.id,
      quantity: 1,
    };
    console.log(data);
    const response = await dispatch(addToCart(data));
    notify();
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-6 md:px-18">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Images */}
          <div className="col-span-1">
            <div className="flex flex-row md:flex-row md:space-x-4">
              {/* Thumbnail Images */}
              <div className="relative md:w-1/6 flex-shrink-0 flex flex-col">
                {/* Thumbnail Images Container */}
                <div
                  className="flex flex-col h-full w-full space-y-2 overflow-hidden"
                  style={{ maxHeight: "500px" }}
                  ref={containerRef}
                >
                  {variantData?.images?.map((image, index) => (
                    <img
                      onClick={() => setMainImage(image.url)}
                      key={index}
                      src={image.url}
                      alt={`Thumbnail ${index}`}
                      className={`w-16 h-16 md:w-20 md:h-20 border ${
                        mainImage === image.url ? "border-red-500" : ""
                      } cursor-pointer object-cover`}
                    />
                  ))}
                </div>
                {/* Scroll Buttons */}
                <button
                  onClick={() => scroll("up")}
                  className="absolute top-0 left-0 w-full py-2 bg-transparent hover:bg-gray-200 border border-gray-300"
                  style={{
                    display:
                      containerRef.current?.scrollHeight >
                      containerRef.current?.clientHeight
                        ? "block"
                        : "none",
                  }}
                >
                  &uarr;
                </button>
                <button
                  onClick={() => scroll("down")}
                  className="absolute bottom-0 left-0 w-full py-2 bg-transparent hover:bg-gray-200 border border-gray-300"
                  style={{
                    display:
                      containerRef.current?.scrollHeight >
                      containerRef.current?.clientHeight
                        ? "block"
                        : "none",
                  }}
                >
                  &darr;
                </button>
              </div>

              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto md:h-full object-cover border"
                  style={{ maxHeight: "500px" }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="col-span-1 space-y-4">
            <h1 className="text-xl md:text-2xl font-semibold">
              {variantData?.name}
            </h1>
            <p className="text-lg md:text-xl font-bold">
              MRP: ₹ {variantData?.price?.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-gray-400">Incl. of taxes</p>
            <p
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{ __html: productData?.description }}
            ></p>
            <div className="space-y-4">
              {/* Variant Selector */}
              <Select
                options={variantOptions}
                onChange={(selectedOption) => {
                  const selectedVariant = productData.variants.find(
                    (variant) => variant.id === selectedOption.value
                  );
                  setVariantData(selectedVariant);
                  setMainImage(selectedVariant.images[0].url);
                }}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                components={{ Option }}
                value={variantOptions.find(
                  (option) => option.value === variantData?.id
                )}
                placeholder="Select a variant"
                className="basic-single"
                classNamePrefix="select"
              />
              {/* Display selected variant details */}
              {variantData && (
                <div className="mt-4  items-center">
                  {variantData.attributes.color
                    ?.split("/")
                    .map((color, index) => (
                      <span
                        key={index}
                        className="mr-2 px-2 py-1 border rounded text-sm"
                      >
                        {color}
                      </span>
                    ))}
                  <div className="ml-4">
                    <b>Size: </b>
                    {variantData.attributes.size ||
                      variantData.attributes.Size ||
                      "No size specified"}
                  </div>

                  <div className="ml-4">
                    <b>Color: </b>
                    {variantData.attributes.color ||
                      variantData.attributes.Color ||
                      "No size specified"}
                  </div>
                </div>
              )}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 rounded"
              >
                Add to Bag
              </button>
              <button className="w-full border py-3 rounded flex items-center justify-center space-x-2">
                <span>Favourite</span>
                <span>♡</span>
              </button>
            </div>
            <ul className="text-gray-700 list-disc pl-4">
              <li>Colour Shown: Multi-Colour/Multi-Colour</li>
              <li>Style: FZ8753-900</li>
              <li>Country/Region of Origin: Vietnam</li>
            </ul>
            <div className="space-y-2">
              <p className="text-black font-semibold cursor-pointer">
                View Product Details
              </p>
              <p className="text-black font-semibold cursor-pointer">
                Delivery & Returns
              </p>
              <p className="text-black font-semibold cursor-pointer">
                Reviews (1)
              </p>
              <p className="text-black font-semibold cursor-pointer">
                Product Information
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
