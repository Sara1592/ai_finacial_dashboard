"use client";

import { useState } from "react";
import { transactions } from "./RecentTransactions";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<
    { question: string; answer: string }[]
  >([]);

  // Calculate total income or expenses
 const calculateTotal = (type: "income" | "expense") => {
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.type === type
  );

  return filteredTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
};
  const handleAskAI = () => {
    if (!question.trim()) {
      return;
    }

    const lowerQuestion = question.toLowerCase();

    // Expense question
    if (
      lowerQuestion.includes("spend") ||
      lowerQuestion.includes("expense")
    ) {
      const totalExpenses = calculateTotal("expense");

      const answer = `You spent ₹${totalExpenses.toLocaleString(
        "en-IN"
      )} on your recent expenses.`;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          question: question,
          answer: answer,
        },
      ]);

      setQuestion("");

      return;
    }

    // Income question
    if (
      lowerQuestion.includes("income") ||
      lowerQuestion.includes("salary") ||
      lowerQuestion.includes("earn")
    ) {
      const totalIncome = calculateTotal("income");

      const answer = `Your total income is ₹${totalIncome.toLocaleString(
        "en-IN"
      )}.`;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          question: question,
          answer: answer,
        },
      ]);

      setQuestion("");

      return;
    }

    // Savings question
    if (
      lowerQuestion.includes("saving") ||
      lowerQuestion.includes("saved")
    ) {
      const totalIncome = calculateTotal("income");
      const totalExpenses = calculateTotal("expense");

      const savings = totalIncome - totalExpenses;

      const answer = `Your total savings are ₹${savings.toLocaleString(
        "en-IN"
      )}.`;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          question: question,
          answer: answer,
        },
      ]);

      setQuestion("");

      return;
    }

    // Unknown question
    const answer =
      "Sorry, I can currently answer questions about your income, expenses, and savings.";

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        question: question,
        answer: answer,
      },
    ]);

    setQuestion("");
  };

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      {/* Heading */}
      <h2 className="text-xl font-bold text-slate-800">
        AI Financial Assistant 🤖
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Ask questions about your finances.
      </p>

      {/* Input */}
  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAskAI();
            }
          }}
          placeholder="Ask: How much did I spend this month?"
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          onClick={handleAskAI}
className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 sm:w-auto"        >
          Ask AI
        </button>
      </div>

      {/* Chat History */}
      {messages.length > 0 && (
        <div className="mt-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-xl bg-indigo-600 px-4 py-3 text-sm text-white">
                  {message.question}
                </div>
              </div>

              {/* AI Answer */}
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                  🤖 {message.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}