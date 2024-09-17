import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/slices/authSlices';import { useNavigate } from 'react-router-dom';
;


// import React from 'react';

// const inputClasses = "border rounded p-2 w-full";
// const textClasses = "text-muted-foreground";
// const linkClasses = "text-primary";
// const bgClasses = "bg-background";
// const buttonClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded w-full";
// const flexClasses = "flex";
// const mbClasses = "mb-4";

// const NikeSignupForm = () => {
//   return (
//     <div className={`flex flex-col p-5 ${bgClasses} rounded-lg shadow-md max-w-md mx-auto`}>
//       {/* <img src="https://openui.fly.dev/openui/24x24.svg?text=🪄" alt="Nike Logo" className="mb-4" /> */}
//       <img
//                 src="https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo-1971-now.png"
//                 alt="Nike Logo"
//                 className="h-10 w-10"
//             />
//       <h2 className="text-lg font-semibold text-foreground mb-2">Now let's make you a Nike Member.</h2>
//       <p className={`${textClasses} ${mbClasses}`}>We've sent a code to vishalgiri197@gmail.com <a href="#" className={linkClasses}>Edit</a></p>
      
//       <form>
//         <div className={mbClasses}>
//           <label className={`block ${textClasses}`}>Code*</label>
//           <input type="text" className={inputClasses} placeholder="Enter Code" required />
//           <span className={`${textClasses} cursor-pointer`}>Resend code in 1s</span>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className={`block ${textClasses}`}>First Name*</label>
//             <input type="text" className={inputClasses} placeholder="First Name" required />
//           </div>
//           <div>
//             <label className={`block ${textClasses}`}>Last Name*</label>
//             <input type="text" className={inputClasses} placeholder="Last Name" required />
//           </div>
//         </div>
        
//         <div className={mbClasses}>
//           <label className={`block ${textClasses}`}>Password*</label>
//           <input type="password" className={inputClasses} placeholder="Password" required />
//           <p className={`${textClasses} text-sm`}>Minimum of 8 characters</p>
//           <p className={`${textClasses} text-sm`}>Uppercase, lowercase letters, and one number</p>
//         </div>
        
//         <div className={mbClasses}>
//           <label className={`block ${textClasses}`}>Shopping Preference*</label>
//           <select className={inputClasses} required>
//             <option value="">Select Preference</option>
//             <option value="online">Online</option>
//             <option value="in-store">In-Store</option>
//           </select>
//         </div>
        
//         <div className={mbClasses}>
//           <label className={`block ${textClasses}`}>Date of Birth*</label>
//           <input type="date" className={inputClasses} required />
//           <p className={textClasses}>Get a Nike Member Reward on your birthday.</p>
//         </div>
        
//         <div className={flexClasses}>
//           <input type="checkbox" className="mr-2" />
//           <label className={textClasses}>Sign up for emails to get updates from Nike on products, offers, and your Member benefits.</label>
//         </div>
        
//         <div className={flexClasses}>
//           <input type="checkbox" className="mr-2" required />
//           <label className={textClasses}>I agree to Nike's <a href="#" className={linkClasses}>Privacy Policy</a> and <a href="#" className={linkClasses}>Terms of Use</a>.</label>
//         </div>
//         <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">Create Account</button>
//       </form>
//     </div>
//   );
// }

// export default NikeSignupForm;


const NikeSignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData)).then(()=>{
      navigate("/auth/signin")
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 font-sans">
      <div className="w-[100%] flex items-center justify-center space-x-2">
        {/* Logo section */}
      </div>
      <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4 mb-4">
          <input type="text" name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
          <input type="text" name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <input type="password" name="password" placeholder="Password*" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <input type="text" name="phoneNumber" placeholder="Phone Number*" value={formData.phoneNumber} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg">Create Account</button>
        <div className="mt-6 text-center">
        <p className="text-sm">Not a member? <a href="/auth/signin" className="text-blue-600">Sign In</a></p>
      </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NikeSignUpForm;

