"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart,
Pie,Cell,  LineChart, Line,
  Dot,} from "recharts";

export default function ReportsPage() {
 const transactions = [
  { id: 1, type: "income", amount: 75000 },
  { id: 2, type: "expense", amount: 12000 },
  { id: 3, type: "expense", amount: 8500 },
  { id: 4, type: "expense", amount: 6500 },
  { id: 5, type: "income", amount: 15000 },
  { id: 6, type: "expense", amount: 5000 },
];
  const expenseBreakdown = [
  { category: "Rent", amount: 12000 },
  { category: "Food", amount: 8500 },
  { category: "Entertainment", amount: 6000 },
  { category: "Shopping", amount: 6500 },
  { category: "Bills", amount: 5000 },
  { category: "Travel", amount: 4500 },
];
  const categoryData = [
  { name: "Food", value: 8500 },
  { name: "Rent", value: 12000 },
  { name: "Travel", value: 4500 },
  { name: "Shopping", value: 6500 },
  { name: "Bills", value: 5000 },
  { name: "Entertainment", value: 6000 },
];
const expenseTrendData = [
  { month: "Jan", expense: 35000 },
  { month: "Feb", expense: 40000 },
  { month: "Mar", expense: 38000 },
  { month: "Apr", expense: 42500 },
  { month: "May", expense: 39000 },
  { month: "Jun", expense: 45000 },
];

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];
    const monthlyData = [
  { month: "Jan", income: 75000, expense: 35000 },
  { month: "Feb", income: 82000, expense: 40000 },
  { month: "Mar", income: 78000, expense: 38000 },
  { month: "Apr", income: 90000, expense: 42000 },
  { month: "May", income: 85000, expense: 39000 },
  { month: "Jun", income: 95000, expense: 45000 },
];
  const [period, setPeriod] = useState("This Month");

  const totalIncome = 90000;
  const totalExpense = 42500;
  const totalSavings = totalIncome - totalExpense;

  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);
  const totalCategoryExpense = expenseBreakdown.reduce(
  (total, item) => total + item.amount,
  0);
const highestSpendingCategory = expenseBreakdown.reduce(
  (highest, item) =>
    item.amount > highest.amount ? item : highest,
  expenseBreakdown[0]
);
const totalMonthlyExpense = expenseTrendData.reduce(
  (total, item) => total + item.expense,
  0);

const averageMonthlyExpense =
  totalMonthlyExpense / expenseTrendData.length;

  const totalTransactions = transactions.length;

  return (
    <div className="flex">
      <Sidebar />
    <main className="flex-1">
        <Header />
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reports
          </h1>
          <p className="mt-1 text-gray-500">
            Track your income, expenses and savings
          </p>  
          
        </div>
        {/* Period Filter */}
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Income */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Income
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            ₹{totalIncome.toLocaleString()}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {period}
          </p>
        </div>

        {/* Total Expense */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Expense
          </p>

          <h2 className="mt-2 text-2xl font-bold text-red-600">
            ₹{totalExpense.toLocaleString()}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {period}
          </p>
        </div>

        {/* Savings */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Savings
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-600">
            ₹{totalSavings.toLocaleString()}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {period}
          </p>
        </div>

        {/* Savings Rate */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Savings Rate
          </p>

          <h2 className="mt-2 text-2xl font-bold text-purple-600">
            {savingsRate}%
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Of total income
          </p>
        </div>

      </div>
      {/* Financial Insights */}
<div className="mt-6">
  <div className="mb-5">
    <h2 className="text-lg font-semibold text-gray-900">
      Financial Insights
    </h2>
    <p className="text-sm text-gray-500">
      Quick insights from your financial activity
    </p>
  </div>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    {/* Highest Spending */}
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        Highest Spending Category
      </p>
      <h3 className="mt-2 text-xl font-bold text-gray-900">
        {highestSpendingCategory.category}
      </h3>
      <p className="mt-1 text-sm text-red-500">
        ₹{highestSpendingCategory.amount.toLocaleString()}
      </p>
    </div>
    {/* Average Expense */}
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        Average Monthly Expense
      </p>
      <h3 className="mt-2 text-xl font-bold text-gray-900">
        ₹{Math.round(averageMonthlyExpense).toLocaleString()}
      </h3>
      <p className="mt-1 text-sm text-gray-400">
        Based on monthly data
      </p>
    </div>
    {/* Transactions */}
    <div className="rounded-xl bg-white p-5 shadow-sm">

      <p className="text-sm text-gray-500">
        Total Transactions
      </p>

      <h3 className="mt-2 text-xl font-bold text-gray-900">
        {totalTransactions}
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        Recorded transactions
      </p>

    </div>

  </div>

</div>
{/* Income vs Expense Chart */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
<div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

  <div className="mb-5">
    <h2 className="text-lg font-semibold text-gray-900">
      Income vs Expense
    </h2>

    <p className="text-sm text-gray-500">
      Monthly income and expense overview
    </p>
  </div>

  <div className="h-[350px] w-full">

    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={monthlyData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="income"
          name="Income"
          fill="#22c55e"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="expense"
          name="Expense"
          fill="#ef4444"
          radius={[6, 6, 0, 0]}
        />

      </BarChart>
    </ResponsiveContainer>

  </div>
</div>
{/* Expense by Category */}

    <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

  <div className="mb-5">
    <h2 className="text-lg font-semibold text-gray-900">
      Expense by Category
    </h2>

    <p className="text-sm text-gray-500">
      See where your money is being spent
    </p>
  </div>

  <div className="h-[350px] w-full">

    <ResponsiveContainer width="100%" height="100%">
      <PieChart>

        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {categoryData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>
    </ResponsiveContainer>

  </div>
</div>
{/* Monthly Expense Trend */}
<div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

  <div className="mb-5">
    <h2 className="text-lg font-semibold text-gray-900">
      Monthly Expense Trend
    </h2>

    <p className="text-sm text-gray-500">
      Track how your expenses change month by month
    </p>
  </div>

  <div className="h-[350px] w-full">

    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={expenseTrendData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="expense"
          name="Expense"
          stroke="#ef4444"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 7 }}
        />

      </LineChart>
    </ResponsiveContainer>

  </div>
</div>
{/* Expense Breakdown */}
<div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

  <div className="mb-5">
    <h2 className="text-lg font-semibold text-gray-900">
      Expense Breakdown
    </h2>

    <p className="text-sm text-gray-500">
      See your spending by category
    </p>
  </div>

  <div className="space-y-5">

    {expenseBreakdown.map((item) => {
      const percentage =
        (item.amount / totalCategoryExpense) * 100;

      return (
        <div key={item.category}>

          <div className="mb-2 flex items-center justify-between">

            <div>
              <p className="font-medium text-gray-800">
                {item.category}
              </p>

              <p className="text-sm text-gray-400">
                {percentage.toFixed(1)}%
              </p>
            </div>

            <p className="font-semibold text-gray-900">
              ₹{item.amount.toLocaleString()}
            </p>

          </div>

          <div className="h-2 w-full rounded-full bg-gray-100">

            <div
              className="h-2 rounded-full bg-blue-500"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>
      );
    })}

  </div>
</div>
</div>
</div>
    </main>
    </div>
  );
}
