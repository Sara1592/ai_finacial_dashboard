"use client";

import { useState } from "react";
import Link from "next/link";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your AI Financial Dashboard account
          </p>
        </div>

        {/* Register Form */}
        <form
          onSubmit={async(e) => {
            e.preventDefault();

            setError("");
            setSuccess("");

            // Check name
            if (!name) {
              setError("Please enter your name");
              return;
            }

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

            // Check confirm password
            if (!confirmPassword) {
              setError("Please confirm your password");
              return;
            }

            // Check passwords match
            if (password !== confirmPassword) {
              setError("Passwords do not match");
              return;
            }

            const userData = {
              name,
              email,
              password,
            };    
            setLoading(true);
            const response = await fetch("/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (!response.ok) {
              setError(data.message);
              setLoading(false);
              return;
          }
          setSuccess(data.message);
          setLoading(false);
        }}
        >
          {/* Name */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

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
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
           {loading ? "Creating Account..." : "Register"}
          </button>
          <p className="mt-6 text-center text-sm text-gray-500">
  Already have an account?{" "}
  <Link
    href="/login"
    className="font-medium text-blue-600 hover:text-blue-700"
  >
    Login
  </Link>
</p>
        </form>
      </div>
    </div>
  );
}