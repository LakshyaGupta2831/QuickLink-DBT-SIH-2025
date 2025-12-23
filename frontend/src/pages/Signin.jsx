// import { Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react";
// import { useContext, useState } from "react";
// import { backendUrl } from "../App";
// import AuthContext from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Signin = ({ onLogin }) => {
//   const [authMode, setAuthMode] = useState("login"); // login or signup
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const { IsAuthenticated, user, setUser, setIsAuthenticated } =
//     useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     state: "",
//     city: "",
//     category: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };
//   const loginUser = async () => {
//     try {
//       const res = await fetch(`${backendUrl}/api/user/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });
//       const data = await res.json();
//       console.log(data.success);
//       if (!data.success) {
//         setError(data.message || "Login failed");
//         return;
//       }
//       setIsAuthenticated(true);
//       setUser(data.user);
//       toast.success(data.message);
//     } catch (err) {
//       console.log("error in signin page");
//       console.log(err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   const registerUser = async () => {
//     try {
//       const res = await fetch(backendUrl + "/api/user/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           state: formData.state,
//           city: formData.city,
//           category: formData.category,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();
//       console.log(data);
//       if (!data.success) {
//         setError(data.message || "Signup failed");
//         return;
//       }
//       setIsAuthenticated(true);
//       setUser(data.user);
//       toast.success(data.message);
//       // onLogin(data.user);
//     } catch (err) {
//       console.log("error in registering user on frontend");
//       console.log(err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   // ---------------------------
//   // HANDLERS
//   // ---------------------------

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError("Email and password are required");
//       return;
//     }

//     loginUser();
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.email || !formData.password) {
//       setError("All fields are required");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     registerUser();
//   };

//   return (
//     <div className="min-h-auto bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-3xl overflow-hidden">
//         {/* Header */}
//         <div className="text-center pt-8 pb-6 px-6">
//           <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
//             <Shield className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-1">
//             {authMode === "login" ? "DBT Portal Login" : "Create Account"}
//           </h1>
//           <p className="text-sm text-gray-600">
//             Direct Benefit Transfer System
//           </p>
//         </div>

//         {/* Form */}
//         <div className="px-6 pb-8">
//           {authMode === "login" ? (
//             <>
//               <form onSubmit={handleLogin} className="space-y-4">
//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="Enter your email"
//                       className="w-full pl-10 pr-4 py-3 border rounded-lg"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       placeholder="Enter your password"
//                       className="w-full pl-10 pr-12 py-3 border rounded-lg"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3"
//                     >
//                       {showPassword ? <EyeOff /> : <Eye />}
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border border-red-200 p-3 rounded">
//                     <span className="text-sm text-red-700">{error}</span>
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg"
//                 >
//                   Sign In
//                 </button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-sm text-gray-600">
//                   Don't have an account?{" "}
//                   <button
//                     onClick={() => {
//                       setAuthMode("signup");
//                       setFormData({
//                         email: "",
//                         password: "",
//                         confirmPassword: "",
//                         fullName: "",
//                       });
//                       setError("");
//                     }}
//                     className="text-blue-600 font-medium hover:underline"
//                   >
//                     Sign Up
//                   </button>
//                 </p>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Signup */}
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                   {/* Full Name */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name
//                     </label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         placeholder="Enter your full name"
//                         className="w-full pl-10 pr-4 py-3 border rounded-lg"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="Enter your email"
//                         className="w-full pl-10 pr-4 py-3 border rounded-lg"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* State */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       State
//                     </label>
//                     <select
//                       name="state"
//                       value={formData.state}
//                       onChange={handleInputChange}
//                       className="w-full border py-3 px-3 rounded-lg"
//                       required
//                     >
//                       <option value="">Select State</option>
//                       <option value="Maharashtra">Maharashtra</option>
//                       <option value="Gujarat">Gujarat</option>
//                       <option value="Delhi">Delhi</option>
//                     </select>
//                   </div>

//                   {/* City */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       placeholder="Enter your city"
//                       className="w-full border py-3 px-3 rounded-lg"
//                       required
//                     />
//                   </div>

//                   {/* Category */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Category
//                     </label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       className="w-full border py-3 px-3 rounded-lg"
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       <option value="Student">Student</option>
//                       <option value="Farmer">Farmer</option>
//                       <option value="Worker">Worker</option>
//                     </select>
//                   </div>

//                   {/* Password */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         placeholder="Create a password"
//                         className="w-full pl-10 pr-4 py-3 border rounded-lg"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Confirm Password (full width on lg) */}
//                   <div className="lg:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         placeholder="Confirm your password"
//                         className="w-full pl-10 pr-4 py-3 border rounded-lg"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border border-red-200 p-3 rounded">
//                     <span className="text-sm text-red-700">{error}</span>
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg"
//                 >
//                   Create Account
//                 </button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-sm text-gray-600">
//                   Already have an account?{" "}
//                   <button
//                     onClick={() => {
//                       setAuthMode("login");
//                       setFormData({
//                         email: "",
//                         password: "",
//                         confirmPassword: "",
//                         fullName: "",
//                       });
//                       setError("");
//                     }}
//                     className="text-blue-600 font-medium hover:underline"
//                   >
//                     Sign In
//                   </button>
//                 </p>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;

import { Shield, IdCard, Keyboard, CheckCircle } from "lucide-react"; // IdCard/Keypad for icons
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import digilockerLogo from "../assets/digilocker-logo.png"; // <-- update path if needed

const npci_url = import.meta.env.VITE_NPCI_URL; // dummy digilocker/npci base url

const Signin = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const [aadhar, setAadhar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);
  const [error, setError] = useState("");

  // ---------------- SEND OTP ----------------
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!aadhar || aadhar.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    try {
      setLoadingSendOtp(true);
      await axios.post(`${npci_url}/api/otp/send-otp`, { aadhar });
      setOtpSent(true);
      toast.success("OTP sent successfully to your linked email");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoadingSendOtp(false);
    }
  };

  // ---------------- VERIFY OTP (LOGIN) ----------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoadingVerifyOtp(true);
      const res = await axios.post(`${npci_url}/api/otp/verify-otp`, {
        aadhar,
        otp,
      });

      // If your dummy digilocker returns { success, data: { sub, user } }
      const data = res.data;
      if (data?.success === false) {
        throw new Error(data.message || "Invalid OTP");
      }

      setVerified(true);
      toast.success("OTP verified, logged in successfully");

      // mark user as logged in in your portal
      console.log(data);
      // {
      //   email: "sahil.22311046@viit.ac.in",
      //   state: "Maharashtra",
      //   city: "pune",
      //   isSeeded: "false",
      //   isProfileComplete: "false",
      // }
      let user = {
        email: data.user.registeredEmail,
        state: data.user.state,
        city: data.user.city,
        isSeeded: data.user.seedingStatus,
        fullName: data.user.name,
        category: data.user.category,
      };
      setUser(user);
      setIsAuthenticated(true);

      // if backend returns user data, store it
      if (data?.data?.user) {
        setUser({
          ...data.data.user,
          sub: data.data.sub,
        });
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || err.message || "Invalid OTP. Try again."
      );
    } finally {
      setLoadingVerifyOtp(false);
    }
  };

  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6">
          <div className="w-20 h-20 bg-gradient-to-r  rounded-full mx-auto mb-4 flex items-center justify-center relative">
            {/* Shield icon background */}
            {/* <Shield className="w-10 h-10 text-white opacity-40" /> */}

            {/* Small DigiLocker logo on top */}
            <img
              src={digilockerLogo}
              alt="DigiLocker"
              className="w-28 h-28 absolute"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            DBT Portal Login
          </h1>
          <p className="text-sm text-gray-600">
            Sign in securely using Aadhaar & DigiLocker OTP
          </p>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <form
            className="space-y-4"
            onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
          >
            {/* Aadhaar Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number
              </label>
              <div className="relative">
                <IdCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="aadhar"
                  value={aadhar}
                  onChange={(e) => {
                    setAadhar(e.target.value.replace(/\D/g, "").slice(0, 12));
                    setError("");
                  }}
                  placeholder="Enter your 12-digit Aadhaar"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Your Aadhaar is used only to fetch masked details via dummy
                DigiLocker.
              </p>
            </div>

            {/* OTP Input (only after OTP is sent) */}
            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Keyboard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setError("");
                    }}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded">
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Primary Button */}
            {!otpSent ? (
              <button
                type="submit"
                disabled={aadhar.length !== 12 || loadingSendOtp}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {loadingSendOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={otp.length !== 6 || loadingVerifyOtp}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {loadingVerifyOtp ? "Verifying..." : "Verify OTP & Sign In"}
              </button>
            )}

            {/* Success banner after verification */}
            {verified && (
              <div className="mt-4 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">
                  You’re logged in via DigiLocker authentication.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
