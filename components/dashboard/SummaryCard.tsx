"use client";
import { transactions } from "./RecentTransactions";

const SummaryCards = () => {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const cards = [
    {
      title: "Total Balance",
      amount: totalBalance,
      icon: "💰",
    },
    {
      title: "Total Income",
      amount: totalIncome,
      icon: "📈",
    },
    {
      title: "Total Expenses",
      amount: totalExpense,
      icon: "📉",
    },
    {
      title: "Savings",
      amount: totalBalance,
      icon: "🎯",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              {card.title}
            </p>

            <span className="text-2xl">
              {card.icon}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-slate-800">
            ₹{card.amount.toLocaleString("en-IN")}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;