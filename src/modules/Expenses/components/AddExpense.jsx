import React, { useState } from "react";
import { motion } from "framer-motion";
import ExpenseService from "../services/expenseService";

function AddExpense() {
  const [form, setForm] = useState({
    item: "",
    amount: "",
    date: "",
    purpose: "",
    payment_method: "",
    category: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Data:", form);
    ExpenseService.AddExpense(form)
    .then(res=> console.log(res))
    .catch(err => console.log(err))
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-8 mt-10"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Add New Expense
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Item */}
        <div className="col-span-1">
          <label className="input-label">Item</label>
          <input
            type="text"
            name="item"
            value={form.item}
            onChange={handleChange}
            className="input-box"
            placeholder="Lunch / Groceries"
          />
        </div>

        {/* Amount */}
        <div className="col-span-1">
          <label className="input-label">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="input-box"
            placeholder="₹ Amount"
          />
        </div>

        {/* Date */}
        <div className="col-span-1">
          <label className="input-label">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input-box"
          />
        </div>

        {/* Purpose */}
        <div className="col-span-1 md:col-span-3">
          <label className="input-label">Purpose</label>
          <input
            type="text"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            className="input-box"
            placeholder="Purpose / Reason"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="input-label">Payment Method</label>
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="input-box"
          >
            <option value="">Select Method</option>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="input-label">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input-box"
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="health">Health</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Note */}
        <div className="md:col-span-3">
          <label className="input-label">Note</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            className="input-box h-24"
            placeholder="Additional notes..."
          ></textarea>
        </div>

        {/* Submit */}
        <div className="md:col-span-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full !bg-blue-600 !hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300"
          >
            Save Expense
          </motion.button>
        </div>

      </form>
    </motion.div>
  );
}

export default AddExpense;
