"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const chartData = [
  {
    month: "Jan",
    income: 75000,
    expense: 42000,
  },
  {
    month: "Feb",
    income: 82000,
    expense: 45000,
  },
  {
    month: "Mar",
    income: 78000,
    expense: 38000,
  },
  {
    month: "Apr",
    income: 90000,
    expense: 48000,
  },
  {
    month: "May",
    income: 85000,
    expense: 41000,
  },
  {
    month: "Jun",
    income: 95000,
    expense: 52000,
  },
];

export default function Chart() {
  return (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
        Income vs Expenses
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Monthly financial overview
      </p>

      <div className="mt-6 h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="income"
              name="Income"
              fill="#4f46e5"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="expense"
              name="Expenses"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}