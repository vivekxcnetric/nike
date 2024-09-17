import React, { useState } from 'react';
import { loginUser } from '../redux/slices/authSlices';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NikeSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    dispatch(loginUser({ email, password })).then(()=>{
      navigate("/")
    });;
  };

  return (
    <div className="max-w-md mx-auto p-6 font-sans">
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
      <h2 className="text-2xl font-bold mb-2">Sign In to Your Nike Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email Address*"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password*"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="rememberMe" className="mt-1" />
            <label htmlFor="rememberMe" className="text-sm">Remember me</label>
          </div>
          <a href="#" className="text-sm text-blue-600">Forgot password?</a>
        </div>
        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg text-center font-semibold hover:bg-gray-800 transition duration-200">
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm">Not a member? <a href="/auth/signup" className="text-blue-600">Join Us</a></p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NikeSignInForm;


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../redux/slices/authSlices';
// import { toast, ToastContainer } from 'react-toastify';

// const SignIn = () => {
//   const [email, setEmail] = useState('vishalgiri197@gmail.com');
//   const [password, setPassword] = useState('');
  
//   const dispatch = useDispatch();

//   const handleSubmit = () => {
//     dispatch(loginUser({ email, password }));
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen px-4">
//       {/* Logo section */}
//       <h1 className="mt-8 text-2xl font-semibold text-center">What's your password?</h1>
//       <div className="mt-4">
//         <span className="text-sm">{email}</span>
//         <a href="#" className="text-sm text-gray-600 underline">Edit</a>
//       </div>
//       <div className="mt-4 w-full max-w-sm">
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" enter your email*" className="w-full px-4 py-4 border rounded-md" />
//       </div>
//       <div className="mt-4 w-full max-w-sm">
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password*" className="w-full px-4 py-4 border rounded-md" />
//       </div>
//       <button onClick={handleSubmit} className="mt-4 ml-72 px-6 py-2 text-white bg-black rounded-full">Sign In</button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default SignIn;
