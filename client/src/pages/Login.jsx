import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

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
      setMessage(
        error.response?.data?.error || "Something went wrong. Try again!"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[380px]">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 💰"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}

        <p className="text-center text-sm mt-6">
          {isLogin ? "New to FinFusion?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Create one" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
