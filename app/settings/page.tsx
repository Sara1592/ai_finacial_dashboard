"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function SettingsPage() {
  const [name, setName] = useState("Saranya");
  const [email, setEmail] = useState("saranya@example.com");
  const [theme, setTheme] = useState("Light");
  const [currency, setCurrency] = useState("INR");
  const [budgetAlerts, setBudgetAlerts] = useState(true);
const [expenseReminders, setExpenseReminders] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1"> 
        <Header />
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your account and application preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="rounded-xl bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-gray-900">
          Profile
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Update your personal information
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

  <h2 className="text-lg font-semibold text-gray-900">
    Appearance
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Customize how your dashboard looks
  </p>

  <div className="mt-6">

    <label className="mb-2 block text-sm font-medium text-gray-700">
      Theme
    </label>

    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 md:w-72"
    >
      <option>Light</option>
      <option>Dark</option>
      <option>System</option>
    </select>

  </div>

</div>
{/* Currency Settings */}
<div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

  <h2 className="text-lg font-semibold text-gray-900">
    Currency
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Choose the currency used throughout your financial dashboard
  </p>

  <div className="mt-6">

    <label className="mb-2 block text-sm font-medium text-gray-700">
      Default Currency
    </label>

    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 md:w-72"
    >
      <option value="INR">INR — ₹ Indian Rupee</option>
      <option value="USD">USD — $ US Dollar</option>
      <option value="EUR">EUR — € Euro</option>
      <option value="GBP">GBP — £ British Pound</option>
    </select>

  </div>

</div>
</div>
{/* Notification Settings */}

<div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">
    Notifications
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Manage your financial alerts and reminders
  </p>

  <div className="mt-6 space-y-5">
<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    {/* Budget Alerts */}
    <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
      <div>
        <h3 className="text-sm font-medium text-gray-900">
          Budget Alerts
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Get notified when you are close to your budget limit
        </p>
      </div>

      <button
        type="button"
        onClick={() => setBudgetAlerts(!budgetAlerts)}
        className={`relative h-6 w-11 rounded-full transition ${
          budgetAlerts ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            budgetAlerts ? "left-6" : "left-1"
          }`}
        ></span>
      </button>
    </div>

    {/* Expense Reminders */}
    <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
      <div>
        <h3 className="text-sm font-medium text-gray-900">
          Expense Reminders
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Get reminders to record your daily expenses
        </p>
      </div>

      <button
        type="button"
        onClick={() => setExpenseReminders(!expenseReminders)}
        className={`relative h-6 w-11 rounded-full transition ${
          expenseReminders ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            expenseReminders ? "left-6" : "left-1"
          }`}
        ></span>
      </button>
    </div>

  </div>
</div>
</div>
{/* Danger Zone */}
<div className="mt-6 rounded-xl border border-red-200 bg-white p-6 shadow-sm">
  <h2 className="text-lg font-semibold text-red-600">
    Danger Zone
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    These actions are permanent and cannot be undone
  </p>

  <div className="mt-6 flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-4">
    <div>
      <h3 className="text-sm font-medium text-red-700">
        Delete Account
      </h3>

      <p className="mt-1 text-sm text-red-600">
        Permanently delete your account and all your financial data
      </p>
    </div>

    <button
      type="button"
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
    >
      Delete Account
    </button>
  </div>
</div>

        {/* Save Button */}
        <button
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>
  {/* Appearance Settings */}

    </div>
  
    </main>
    </div>
  );
}