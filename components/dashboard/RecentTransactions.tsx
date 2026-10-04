"use client";

import { useState } from "react";
export const transactions = [
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
];


const RecentTransactions = () => {
const [search, setSearch] = useState("");

 const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <section>
  <div className="mb-4">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search transactions..."
      className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
    />
  </div>
 <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">

  {filteredTransactions.map((transaction) => (
    <div
      key={transaction.id}
      className="flex items-center justify-between gap-3 border-b border-slate-100 py-4 last:border-0"
    >
      <div>
        <p className="font-medium text-slate-800">
          {transaction.name}
        </p>

        <p className="text-sm text-slate-500">
          {transaction.category}
        </p>
      </div>

      <p
        className={`shrink-0 text-sm sm:text-base font-semibold ${
          transaction.type === "income"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
       {transaction.type === "income" ? "+" : "-"}
  ₹{transaction.amount.toLocaleString("en-IN")}
      </p>
    </div>
  ))}
{filteredTransactions.length === 0 && (
  <p className="py-6 text-center text-sm text-slate-500">
    No transactions found.
  </p>
)}
  {/* View All Button */}
  <button className="mt-4 w-full rounded-lg py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition">
    View All Transactions
  </button>

</div>
   </section>
  )
}

 export default RecentTransactions;

