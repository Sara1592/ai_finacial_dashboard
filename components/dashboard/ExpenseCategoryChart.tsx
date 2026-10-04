"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { transactions } from "./RecentTransactions";

const expenseTransactions = transactions.filter(
  (transaction) => transaction.type === "expense"
);
const categoryData = Object.values(
  expenseTransactions.reduce((acc, transaction) => {
    const category = transaction.category;

    if (!acc[category]) {
      acc[category] = {
        category,
        amount: 0,
      };
    }

    acc[category].amount += transaction.amount;

    return acc;
  }, {} as Record<string, { category: string; amount: number }>)
);

export default function ExpenseCategoryChart() {
    const COLORS = ["#4f46e5", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];
  return (
   <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
       <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
        Expenses by Category
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Where your money is going
      </p>

      <div className="mt-6 h-64 sm:h-80">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
  data={categoryData}
  dataKey="amount"
  nameKey="category"
  cx="50%"
  cy="50%"
  outerRadius={100}
  label
>
    {categoryData.map((entry, index) => (
  <Cell
    key={`cell-${index}`}
    fill={COLORS[index % COLORS.length]}
  />
))}
</Pie>
<Tooltip/>
<Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
    </div>
  );
}