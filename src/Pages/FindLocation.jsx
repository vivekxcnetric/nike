import React, { useState } from 'react';
import axios from 'axios';

const FindLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Log the precise location
          console.log('Exact Latitude:', latitude, 'Exact Longitude:', longitude);

          setLocation({ latitude, longitude });
          setError(null); // Clear any previous errors

          // Fetch address using reverse geocoding
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const { display_name } = response.data;
            setAddress(display_name);
          } catch (err) {
            setError('Unable to retrieve the address');
          }
        },
        (err) => {
          // Handle different geolocation errors
          if (err.code === err.PERMISSION_DENIED) {
            setError('Permission denied. Please allow access to location.');
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            setError('Location unavailable. Please try again.');
          } else if (err.code === err.TIMEOUT) {
            setError('Request timed out. Please try again.');
          } else {
            setError('Unable to retrieve your location.');
          }
        },
        {
          enableHighAccuracy: true, // Try to use the most accurate position
          timeout: 10000, // Wait up to 10 seconds
          maximumAge: 0, // Always request a new position
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Find Your Location</h1>
      <button
        onClick={handleFindLocation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Find My Location
      </button>

      {location.latitude && location.longitude ? (
        <div className="text-lg mb-4">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {address && <p>Address: {address}</p>}

          {/* Embed Google Map */}
          <iframe
            title="Google Map"
            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${location.latitude},${location.longitude}&zoom=15`}
            width="600"
            height="450"
            className="border-0 rounded-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FindLocation;
