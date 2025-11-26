import React, { useEffect, useState } from "react";
import ExpenseService from "../services/expenseService";
import { motion } from "framer-motion";

export default function AllExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    ExpenseService.allExpenses()
      .then((res) => {
        setExpenses(res.allExpenses);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        All Expenses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {expenses.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white shadow-lg rounded-2xl p-5 border hover:shadow-xl transition"
          >
            {/* Item + Amount */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {exp.item}
              </h2>
              <span className="text-lg font-semibold text-green-600">
                ₹ {exp.amount}
              </span>
            </div>

            {/* Date */}
            <p className="text-gray-500 text-sm mt-1">
              {new Date(exp.expense_date).toLocaleDateString()}
            </p>

            {/* Purpose */}
            <p className="mt-3 text-gray-700">
              {exp.purpose}
            </p>

            {/* Category + Payment Method */}
            <div className="flex items-center gap-3 mt-4">

              {/* Category Badge */}
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {exp.category}
              </span>

              {/* Payment Method Badge */}
              <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 capitalize">
                {exp.payment_method}
              </span>
            </div>

            {/* Note */}
            {exp.note && (
              <p className="mt-3 text-gray-600 italic text-sm">
                “{exp.note}”
              </p>
            )}

            {/* Footer */}
            <div className="border-t pt-3 mt-4 text-xs text-gray-500">
              Added by: <span className="font-medium">{exp.fullname}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
