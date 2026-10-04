"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to your AI Financial Dashboard
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={ async(e) => {
            e.preventDefault();

            setError("");
            setSuccess("");


            // Check email
            if (!email) {
              setError("Please enter your email");
              return;
            }

            // Check email format
            if (!email.includes("@")) {
              setError("Please enter a valid email");
              return;
            }

            // Check password
            if (!password) {
              setError("Please enter your password");
              return;
            }

            // Check password length
            if (password.length < 6) {
              setError("Password must be at least 6 characters");
              return;
            }

           const userData = {
  email: email,
  password: password,
};  
            setLoading(true);
 const response = await fetch("/api/login", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json"
  },
  body: JSON.stringify(userData),
});   
 const data = await response.json();
 if(!response.ok) {
  setError(data.message || "An error occurred");
  setLoading(false);
  return;
} 
setSuccess(data.message || "Login successful");
setLoading(false);        
          }}
        >
          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

           <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter your password"
    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-20 outline-none focus:border-blue-500"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-gray-700"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>
</div>
{/* Error Message */}
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>  
          )}

{success && (
  <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
    {success}
  </p>
)}
          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
           {loading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-6 text-center text-sm text-gray-500">
  Don't have an account?{" "}
  <Link
    href="/register"
    className="font-medium text-blue-600 hover:text-blue-700"
  >
    Register
  </Link>
</p>

        </form>
      </div>
    </div>
  );
}