import React, { useState } from 'react';

const Join = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className=" w-[100%] flex items-center justify-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
          alt="Nike Logo"
          className="h-6 "
        />
        <img
          src="https://th.bing.com/th?id=OIP.TWDOn4eq1Zipw770Qken7gHaG6&w=258&h=241&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          alt="Jordan Logo"
          className="h-8 mr-72 "
        />
      </div>
      <h1 className="mt-8 text-2xl font-semibold text-center">
        Enter your email to join us or sign in.
      </h1>
      <div className="mt-4">
        <span className="text-sm">India </span>
        <a href="#" className="text-sm text-gray-600 underline">
          Change
        </a>
      </div>
      <div className="mt-4 w-full max-w-sm">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email*"
          className="w-full px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        By continuing, I agree to Nike’s{' '}
        <a href="#" className="text-gray-600 underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="#" className="text-gray-600 underline">
          Terms of Use
        </a>.
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 ml-72 px-6 py-2 text-white bg-black rounded-full focus:outline-none"
      >
        Continue
      </button>
    </div>
  );
};

export default Join;
