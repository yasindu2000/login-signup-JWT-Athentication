import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100" >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Log In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;