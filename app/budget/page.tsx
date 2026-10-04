"use client";

import { useState } from "react";
import {
  Wallet,
  Plus,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function BudgetPage() {
  // =====================================
  // MODAL
  // =====================================

  const [showModal, setShowModal] = useState(false);

  // =====================================
  // EDIT MODE
  // =====================================

  const [editingBudget, setEditingBudget] = useState(null);

  // =====================================
  // BUDGET DATA
  // =====================================

  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Food",
      budget: 5000,
      spent: 3200,
      month: "2026-09",
    },
    {
      id: 2,
      category: "Rent",
      budget: 12000,
      spent: 12000,
      month: "2026-09",
    },
    {
      id: 3,
      category: "Travel",
      budget: 3000,
      spent: 1800,
      month: "2026-09",
    },
    {
      id: 4,
      category: "Shopping",
      budget: 5000,
      spent: 4200,
      month: "2026-09",
    },
    {
      id: 5,
      category: "Bills",
      budget: 4000,
      spent: 2500,
      month: "2026-09",
    },
    {
      id: 6,
      category: "Entertainment",
      budget: 3000,
      spent: 1200,
      month: "2026-09",
    },
  ]);

  // =====================================
  // FORM STATES
  // =====================================

  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  // =====================================
  // SUMMARY CALCULATIONS
  // =====================================

  const totalBudget = budgets.reduce((total, item) => {
    return total + item.budget;
  }, 0);

  const totalSpent = budgets.reduce((total, item) => {
    return total + item.spent;
  }, 0);

  const remaining = totalBudget - totalSpent;

  const percentage =
    totalBudget > 0
      ? Math.round((totalSpent / totalBudget) * 100)
      : 0;

  // =====================================
  // RESET FORM
  // =====================================

  const resetForm = () => {
    setCategory("Food");
    setAmount("");
    setMonth("");
    setEditingBudget(null);
  };

  // =====================================
  // CLOSE MODAL
  // =====================================

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  // =====================================
  // ADD / UPDATE BUDGET
  // =====================================

  const handleAddBudget = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid budget amount");
      return;
    }

    if (!month) {
      alert("Please select a month");
      return;
    }

    // =====================================
    // EDIT EXISTING BUDGET
    // =====================================

    if (editingBudget) {
      setBudgets((previousBudgets) =>
        previousBudgets.map((item) =>
          item.id === editingBudget.id
            ? {
                ...item,
                category: category,
                budget: Number(amount),
                month: month,
              }
            : item
        )
      );

      closeModal();
      return;
    }

    // =====================================
    // CHECK DUPLICATE CATEGORY + MONTH
    // =====================================

    const existingBudget = budgets.find(
      (item) =>
        item.category === category &&
        item.month === month
    );

    // =====================================
    // IF CATEGORY ALREADY EXISTS
    // UPDATE ITS BUDGET
    // =====================================

    if (existingBudget) {
      setBudgets((previousBudgets) =>
        previousBudgets.map((item) =>
          item.id === existingBudget.id
            ? {
                ...item,
                budget: item.budget + Number(amount),
              }
            : item
        )
      );

      closeModal();
      return;
    }

    // =====================================
    // ADD NEW CATEGORY
    // =====================================

    const newBudget = {
      id: Date.now(),
      category: category,
      budget: Number(amount),
      spent: 0,
      month: month,
    };

    setBudgets((previousBudgets) => [
      ...previousBudgets,
      newBudget,
    ]);

    closeModal();
  };

  // =====================================
  // EDIT BUDGET
  // =====================================

  const handleEditBudget = (item) => {
    setEditingBudget(item);

    setCategory(item.category);
    setAmount(item.budget);
    setMonth(item.month);

    setShowModal(true);
  };

  // =====================================
  // DELETE BUDGET
  // =====================================

  const handleDeleteBudget = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget?"
    );

    if (!confirmDelete) {
      return;
    }

    setBudgets((previousBudgets) =>
      previousBudgets.filter((item) => item.id !== id)
    );
  };

  // =====================================
  // FORMAT MONTH
  // =====================================

  const formatMonth = (month) => {
    if (!month) {
      return "";
    }

    const [year, monthNumber] = month.split("-");

    const date = new Date(
      Number(year),
      Number(monthNumber) - 1
    );

    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900">

      {/* =====================================
          TOP HEADER
      ===================================== */}

      <header className="flex h-20 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">

        <div>
          <h2 className="text-xl font-bold sm:text-2xl">
            Budget
          </h2>

          <p className="text-sm text-gray-500">
            Manage your monthly budgets
          </p>
        </div>

        {/* ADD BUDGET BUTTON */}

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
        >
          <Plus size={18} />

          <span className="hidden sm:block">
            Add Budget
          </span>
        </button>

      </header>

      {/* =====================================
          PAGE CONTENT
      ===================================== */}

      <div className="p-4 sm:p-6">

        {/* =====================================
            SUMMARY CARDS
        ===================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL BUDGET */}

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Budget
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              ₹{totalBudget.toLocaleString()}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Across all categories
            </p>

          </div>

          {/* TOTAL SPENT */}

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Spent
            </p>

            <h3 className="mt-2 text-2xl font-bold text-red-500">
              ₹{totalSpent.toLocaleString()}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Money already spent
            </p>

          </div>

          {/* REMAINING */}

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Remaining
            </p>

            <h3
              className={`mt-2 text-2xl font-bold ${
                remaining >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ₹{remaining.toLocaleString()}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Available budget
            </p>

          </div>

          {/* USAGE */}

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Budget Usage
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {percentage}%
            </h3>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">

              <div
                className={`h-full rounded-full ${
                  percentage >= 100
                    ? "bg-red-500"
                    : percentage >= 80
                    ? "bg-yellow-500"
                    : "bg-purple-600"
                }`}
                style={{
                  width: `${Math.min(
                    percentage,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* =====================================
            BUDGET CATEGORIES
        ===================================== */}

        <div className="mt-8">

          <div className="mb-4">

            <h3 className="text-lg font-bold">
              Budget Categories
            </h3>

            <p className="text-sm text-gray-500">
              Track your spending against each budget
            </p>

          </div>

          {/* =====================================
              NO BUDGET
          ===================================== */}

          {budgets.length === 0 ? (

            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

              <Wallet
                size={40}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 text-lg font-semibold">
                No budgets yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Click Add Budget to create your first budget.
              </p>

            </div>

          ) : (

            /* =====================================
               BUDGET CARDS
            ===================================== */

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

              {budgets.map((item) => {

                const usedPercentage =
                  item.budget > 0
                    ? Math.round(
                        (item.spent / item.budget) * 100
                      )
                    : 0;

                let progressColor = "bg-purple-600";

                if (usedPercentage >= 100) {
                  progressColor = "bg-red-500";
                } else if (usedPercentage >= 80) {
                  progressColor = "bg-yellow-500";
                }

                const itemRemaining =
                  item.budget - item.spent;

                return (

                  <div
                    key={item.id}
                    className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                  >

                    {/* CARD HEADER */}

                    <div className="flex items-start justify-between">

                      <div>

                        <h4 className="font-semibold">
                          {item.category}
                        </h4>

                        {item.month && (
                          <p className="mt-1 text-xs text-gray-400">
                            {formatMonth(item.month)}
                          </p>
                        )}

                      </div>

                      <div className="flex items-center gap-2">

                        {/* PERCENTAGE */}

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            usedPercentage >= 100
                              ? "bg-red-100 text-red-600"
                              : usedPercentage >= 80
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {usedPercentage}%
                        </span>

                      </div>

                    </div>

                    {/* AMOUNTS */}

                    <div className="mt-5 flex items-end justify-between">

                      <div>

                        <p className="text-xs text-gray-400">
                          Spent
                        </p>

                        <p className="mt-1 text-lg font-bold">
                          ₹{item.spent.toLocaleString()}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-xs text-gray-400">
                          Budget
                        </p>

                        <p className="mt-1 text-lg font-bold">
                          ₹{item.budget.toLocaleString()}
                        </p>

                      </div>

                    </div>

                    {/* PROGRESS BAR */}

                    <div className="mt-4">

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                        <div
                          className={`h-full rounded-full ${progressColor}`}
                          style={{
                            width: `${Math.min(
                              usedPercentage,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* REMAINING */}

                    <div className="mt-3 flex justify-between text-xs">

                      <span className="text-gray-400">
                        Remaining
                      </span>

                      <span
                        className={
                          itemRemaining >= 0
                            ? "font-medium text-green-600"
                            : "font-medium text-red-600"
                        }
                      >
                        ₹{itemRemaining.toLocaleString()}
                      </span>

                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="mt-5 flex gap-2 border-t pt-4">

                      <button
                        onClick={() =>
                          handleEditBudget(item)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteBudget(item.id)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </div>

      </div>

      {/* =====================================
          ADD / EDIT BUDGET MODAL
      ===================================== */}

      {showModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  {editingBudget
                    ? "Edit Budget"
                    : "Add Budget"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingBudget
                    ? "Update your budget details"
                    : "Create a new category budget"}
                </p>

              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <div className="mt-6 space-y-5">

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500"
                >

                  <option value="Food">
                    Food
                  </option>

                  <option value="Rent">
                    Rent
                  </option>

                  <option value="Travel">
                    Travel
                  </option>

                  <option value="Shopping">
                    Shopping
                  </option>

                  <option value="Bills">
                    Bills
                  </option>

                  <option value="Entertainment">
                    Entertainment
                  </option>

                  <option value="Healthcare">
                    Healthcare
                  </option>

                  <option value="Education">
                    Education
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* AMOUNT */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Budget Amount
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                />

              </div>

              {/* MONTH */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Month
                </label>

                <input
                  type="month"
                  value={month}
                  onChange={(e) =>
                    setMonth(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddBudget}
                  className="flex-1 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  {editingBudget
                    ? "Update Budget"
                    : "Add Budget"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
    </main>
    </div>
  );
}