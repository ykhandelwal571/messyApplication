import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "", // ✅ Added email field for sign-up
    password: "",
    userType: "customer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // ✅ Toggle between Login & SignUp

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (isSignUp && !formData.email.trim()) {
      setError("Please enter your email for registration");
      return;
    }

    try {
      const endpoint = isSignUp ? "register" : "login"; // ✅ Dynamically select API
      const payload = isSignUp
        ? { username: formData.username, email: formData.email, password: formData.password, userType: formData.userType }
        : { username: formData.username, password: formData.password, userType: formData.userType };

      const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
      } else {
        alert(data.message);
        if (!isSignUp) {
          onLogin(data.userType, formData.username);
        } else {
          setIsSignUp(false); // ✅ Switch to login after successful signup
          setFormData({ username: "", email: "", password: "", userType: "customer" });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/628233/pexels-photo-628233.jpeg')`,
      }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg bg-opacity-65 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-700">
            The Messy Application
          </h2>
          <p className="text-gray-600 mt-2">
            {isSignUp ? "Create an account" : "Welcome back! Please enter your details."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login As
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: "customer" }))
                }
                className={`p-3 text-center rounded-lg border transition-colors
                  ${
                    formData.userType === "customer"
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-red-600"
                  }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: "manager" }))
                }
                className={`p-3 text-center rounded-lg border transition-colors
                  ${
                    formData.userType === "manager"
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-red-600"
                  }`}
              >
                Mess Manager
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-red-600">
            {isSignUp ? "Already have an account? Login" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
