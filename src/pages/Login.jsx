import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required");
    } else {
      setError("");
      // Handle login logic here
      console.log("Logging in with:", { username, password });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          <h1 className="text-4xl font-bold mb-8">Welcome to Gutenberg</h1>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-6"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            type="submit"
          >
            Login
          </button>

          <Link to="/dashboard" className="w-full">
            <button className="w-full bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out">
              Go to Dashboard
            </button>
          </Link>

          <Link to="/pages" className="w-full">
            <button className="w-full bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out">
              Go to Chat
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
