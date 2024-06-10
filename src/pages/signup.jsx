import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      const response = await fetch(`${host}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Signup failed:", data);
        alert("Signup failed: " + (data.message || "Unknown error"));
        return;
      }

      login(data.newUser, data.token);
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
      <section className="p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl w-full max-w-md border border-yellow-500">
       <h1 className="text-2xl font-bold mb-4 text-center text-yellow-300">Sign Up</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className="space-y-4">
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            autoComplete="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white" 
          />
          <input 
            type="text" 
            name="email" 
            placeholder="Email" 
            autoComplete="new-email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white" 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            autoComplete="new-password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white" 
          />
          <input 
            type="submit" 
            value="Sign Up" 
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg" 
          />
        </form>
      </section>
    </div>
  );
};

export default Signup;