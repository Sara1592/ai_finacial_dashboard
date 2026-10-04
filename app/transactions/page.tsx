
"use client";

import { useState } from "react";
import Siderbar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  // Edit state
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  // Transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Salary",
      category: "Income",
      amount: 75000,
      type: "income",
    },
    {
      id: 2,
      name: "Rent",
      category: "Housing",
      amount: 12000,
      type: "expense",
    },
    {
      id: 3,
      name: "Grocery",
      category: "Food",
      amount: 3500,
      type: "expense",
    },
    {
      id: 4,
      name: "Freelance Project",
      category: "Income",
      amount: 15000,
      type: "income",
    },
  ]);

  // --------------------------------
  // Open Add Transaction Modal
  // --------------------------------
  const handleOpenAddModal = () => {
    setEditingTransaction(null);

    setName("");
    setAmount("");
    setCategory("");
    setType("income");

    setShowModal(true);
  };

  // --------------------------------
  // Open Edit Transaction Modal
  // --------------------------------
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);

    setName(transaction.name);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setType(transaction.type);

    setShowModal(true);
  };

  // --------------------------------
  // Save Transaction
  // Add OR Update
  // --------------------------------
  const handleSaveTransaction = () => {
    // Validation
    if (!name || !amount || !category) {
      return;
    }

    // UPDATE
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === editingTransaction.id
            ? {
                ...transaction,
                name,
                category,
                amount: Number(amount),
                type,
              }
            : transaction
        )
      );
    }

    // ADD
    else {
      const newTransaction = {
        id: Date.now(),
        name,
        category,
        amount: Number(amount),
        type,
      };

      setTransactions((prev) => [newTransaction, ...prev]);
    }

    // Reset form
    setName("");
    setAmount("");
    setCategory("");
    setType("income");

    setEditingTransaction(null);
    setShowModal(false);
  };

  // --------------------------------
  // Delete Transaction
  // --------------------------------
  const handleDeleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  // --------------------------------
  // Close Modal
  // --------------------------------
  const handleCloseModal = () => {
    setShowModal(false);

    setEditingTransaction(null);

    setName("");
    setAmount("");
    setCategory("");
    setType("income");
  };

  // --------------------------------
  // Search + Filter
  // --------------------------------
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || transaction.type === filter;

    return matchesSearch && matchesFilter;
  });

  // --------------------------------
  // Total Expense
  // --------------------------------
  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // --------------------------------
  // Total Income
  // --------------------------------
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // --------------------------------
  // Balance
  // --------------------------------
  const balance = totalIncome - totalExpense;

  return (
    <div className="flex">
      <Siderbar />
      <main className="flex-1">
      <Header />
    <div className="p-4 sm:p-6">

      {/* =========================
          PAGE HEADER
      ========================== */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Transactions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your income and expenses.
        </p>

        <button
          onClick={handleOpenAddModal}
          className="mt-4 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          + Add Transaction
        </button>
      </div>

      {/* =========================
          SUMMARY CARDS
      ========================== */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Income */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Income
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            ₹{totalIncome.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Total Expense */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Expense
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Balance */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Balance
          </p>

          <p className="mt-2 text-2xl font-bold text-indigo-600">
            ₹{balance.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      {/* =========================
          SEARCH + FILTER
      ========================== */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none sm:w-48"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

      </div>

      {/* =========================
          TRANSACTION LIST
      ========================== */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm">

        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between gap-3 border-b border-slate-100 p-4 last:border-0 sm:p-5"
          >

            {/* Transaction Details */}
            <div>
              <p className="font-semibold text-slate-800">
                {transaction.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {transaction.category}
              </p>
            </div>

            {/* Amount + Buttons */}
            <div className="flex items-center gap-3">

              {/* Amount */}
              <p
                className={`shrink-0 text-sm font-semibold sm:text-base ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}₹
                {transaction.amount.toLocaleString("en-IN")}
              </p>

              {/* Edit */}
              <button
                onClick={() => handleEditTransaction(transaction)}
                className="rounded-lg px-2 py-1 text-indigo-500 hover:bg-indigo-50"
                title="Edit transaction"
              >
                ✏️
              </button>

              {/* Delete */}
              <button
                onClick={() =>
                  handleDeleteTransaction(transaction.id)
                }
                className="rounded-lg px-2 py-1 text-red-500 hover:bg-red-50"
                title="Delete transaction"
              >
                🗑️
              </button>

            </div>
          </div>
        ))}

        {/* No Transactions */}
        {filteredTransactions.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">
            No transactions found.
          </p>
        )}

      </div>

      {/* =========================
          ADD / EDIT MODAL
      ========================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-800">
                {editingTransaction
                  ? "Edit Transaction"
                  : "Add Transaction"}
              </h2>

              {/* Close */}
              <button
                onClick={handleCloseModal}
                className="text-xl text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>

            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-slate-500">
              {editingTransaction
                ? "Update your transaction details."
                : "Add a new income or expense."}
            </p>

            <div className="mt-6 space-y-4">

              {/* =================
                  NAME
              ================== */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Example: Salary"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* =================
                  AMOUNT
              ================== */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Amount
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Example: 50000"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* =================
                  CATEGORY
              ================== */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Example: Salary"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* =================
                  TYPE
              ================== */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

            </div>

            {/* =================
                SAVE BUTTON
            ================== */}
            <button
              onClick={handleSaveTransaction}
              className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              {editingTransaction
                ? "Update Transaction"
                : "Add Transaction"}
            </button>

          </div>
        </div>
      )}
</div>
    </main>
    </div>
  );
}

