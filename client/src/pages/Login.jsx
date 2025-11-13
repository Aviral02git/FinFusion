// import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setMessage("");
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = isLogin
//       ? "https://finfusion-ecvy.onrender.com/api/auth/login"
//       : "https://finfusion-ecvy.onrender.com/api/auth/register";

//     try {
//       const res = await axios.post(endpoint, formData);
//       setMessage(res.data.message || "Success!");

//       if (isLogin && res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         window.location.href = "/dashboard"; // redirect after login
//       }
//     } catch (error) {
//       setMessage(
//         error.response?.data?.error || "Something went wrong. Try again!"
//       );
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-[380px]">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           {isLogin ? "Welcome Back 👋" : "Create Your Account 💰"}
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         {message && (
//           <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
//         )}

//         <p className="text-center text-sm mt-6">
//           {isLogin ? "New to FinFusion?" : "Already have an account?"}{" "}
//           <button
//             onClick={toggleForm}
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             {isLogin ? "Create one" : "Login here"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FinFusionAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "Unified Financial Dashboard",
      description: "View your bank accounts, credit cards, and digital wallets in one place for complete financial clarity.",
      color: "bg-emerald-50",
    },
    {
      title: "Smart Expense Tracking",
      description: "Automatically categorize and analyze your spending patterns to make smarter financial decisions.",
      color: "bg-green-50",
    },
    {
      title: "Secure Bank Connectivity",
      description: "Link multiple bank accounts safely with our encrypted connections and manage all your funds seamlessly.",
      color: "bg-teal-50",
    },
    {
      title: "Financial Insights",
      description: "Get AI-driven insights to optimize your savings, spending, and overall financial health.",
      color: "bg-lime-50",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "https://finfusion-ecvy.onrender.com/api/auth/login"
      : "https://finfusion-ecvy.onrender.com/api/auth/register";

    try {
      const res = await axios.post(endpoint, formData);
      setMessage(res.data.message || "Success!");

      if (isLogin && res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard"; // redirect after login
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-50">
      <div className="w-full max-w-3xl mx-6 md:mx-0 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Brand / Slider */}
        <div className="hidden md:flex flex-col justify-center pl-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12h18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6h18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">FinFusion</h3>
                <p className="text-sm text-gray-500">Smart finance, simplified.</p>
              </div>
            </div>
          </div>

          {/* Feature Slider */}
          <div className={`transition-all duration-700 ease-in-out p-8 rounded-2xl shadow-md ${features[currentSlide].color}`}>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{features[currentSlide].title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{features[currentSlide].description}</p>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-4 justify-center">
            {features.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-500 ${i === currentSlide ? "bg-emerald-600 w-5" : "bg-gray-300"}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right: Form Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{isLogin ? "Welcome back" : "Create your account"}</h2>
              <p className="text-sm text-gray-500 mt-1">{isLogin ? "Sign in to access FinFusion" : "Start your FinFusion journey"}</p>
            </div>
            <div className="hidden sm:flex gap-2 items-center">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-3 py-1 rounded-lg text-sm ${isLogin ? "bg-green-50 text-emerald-700 font-semibold" : "text-gray-500 hover:bg-gray-50"}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-3 py-1 rounded-lg text-sm ${!isLogin ? "bg-green-50 text-emerald-700 font-semibold" : "text-gray-500 hover:bg-gray-50"}`}
              >
                Sign up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-600 mb-2">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="At least 6 characters"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              {isLogin ? "Login" : "Create account"}
            </button>

            {message && (
              <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
            )}

            <div className="pt-4 text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  New to FinFusion? <button onClick={() => setIsLogin(false)} className="text-emerald-600 font-medium hover:underline">Create account</button>
                </>
              ) : (
                <>
                  Already have an account? <button onClick={() => setIsLogin(true)} className="text-emerald-600 font-medium hover:underline">Sign in</button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-400">
        <span>Secure · Encrypted · Trusted</span>
      </div>
    </div>
  );
}

