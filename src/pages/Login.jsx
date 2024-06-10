import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${host}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Login failed:", data);
        alert("Login failed: " + (data.message || "Unknown error"));
        return;
      }

      login(data.user, data.token);
      navigate("/");
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: " + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
      <section className="p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl border border-yellow-500">
      <h1 className="text-2xl font-bold mb-4 text-center text-yellow-300">Log In</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="submit"
            value="Log In"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-600"
          />
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Forgot password?
            </a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;