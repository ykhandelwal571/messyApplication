import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "customer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    onLogin(formData.userType, formData.username);
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
            Welcome back! Please enter your details.
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
                  handleChange({
                    target: { name: "userType", value: "customer" },
                  })
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
                  handleChange({
                    target: { name: "userType", value: "manager" },
                  })
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
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <a href="#" className="text-red-600 hover:text-red-700">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
