import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpenseService from "../services/expenseService";
import {
  DollarSign,
  Calendar,
  Tag,
  Briefcase,
  FileText,
  AlignLeft,
  Check,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";



function AddIncome() {
  const { id } = useParams();
  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: "",
    descriptions: "",
    category: "",
    payment_method: "",
    note: "",
    id: null
  });

  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  let [buttonName, setButton] = useState("Save");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchExpenseById = async (expenseId) => {
    try {
      ExpenseService.getTransactionById(expenseId, "income")
        .then((res) => {
          const transaction = res.transaction;
          const formattedDate = new Date(transaction.expense_date)
            .toISOString()
            .split("T")[0];
          setForm({
            ...transaction,
            date: formattedDate,
          });
          setButton("Update")
        })
        .catch((err) => console.log(err));


    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExpenseById(id);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Income Data:", form);

    ExpenseService.addIncome(form)
      .then(res => {
        console.log(res);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setForm({
            source: "",
            amount: "",
            date: "",
            descriptions: "",
            category: "",
            payment_method: "",
            note: "",
            id: null
          });
          navigate('/addIncome')
        }, 2000);
      })
      .catch(err => console.log(err));
  };

  const categoryIcons = {
    salary: "💼",
    freelance: "💻",
    investment: "📈",
    business: "🏢",
    gift: "🎁",
    others: "💰"
  };

  const paymentIcons = {
    cash: "💵",
    bank_transfer: "🏦",
    upi: "📱",
    check: "📝"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-lg mb-4"
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold bg-gradient-to-r from-green-900 to-emerald-700 bg-clip-text text-transparent mb-2"
          >
            Add New Income
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-green-600" />
            Track your earnings with style
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Row 1: Source, Amount, Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Source */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Income Source
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('source')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-11 pr-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 ${focusedField === 'source'
                        ? 'border-green-600 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                    placeholder="e.g., Salary, Freelance"
                    required
                  />
                </div>
              </motion.div>

              {/* Amount */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-lg font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('amount')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-11 pr-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 ${focusedField === 'amount'
                        ? 'border-green-600 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                    placeholder="₹ 0.00"
                    required
                  />
                </div>
              </motion.div>

              {/* Date */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-11 pr-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 ${focusedField === 'date'
                        ? 'border-green-600 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                    required
                  />
                </div>
              </motion.div>

            </div>

            {/* Row 2: Description */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="descriptions"
                  value={form.descriptions}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-11 pr-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 ${focusedField === 'description'
                      ? 'border-green-600 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300'
                    }`}
                  placeholder="Brief description of income"
                  required
                />
              </div>
            </motion.div>

            {/* Row 3: Category & Payment Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Category */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('category')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-11 pr-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 appearance-none cursor-pointer ${focusedField === 'category'
                        ? 'border-green-600 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="salary">{categoryIcons.salary} Salary</option>
                    <option value="freelance">{categoryIcons.freelance} Freelance</option>
                    <option value="investment">{categoryIcons.investment} Investment</option>
                    <option value="business">{categoryIcons.business} Business</option>
                    <option value="gift">{categoryIcons.gift} Gift</option>
                    <option value="others">{categoryIcons.others} Others</option>
                  </select>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Payment Method
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select
                    name="payment_method"
                    value={form.payment_method}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('payment_method')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-11 pr-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 appearance-none cursor-pointer ${focusedField === 'payment_method'
                        ? 'border-green-600 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                    required
                  >
                    <option value="">Select Method</option>
                    <option value="cash">{paymentIcons.cash} Cash</option>
                    <option value="bank_transfer">{paymentIcons.bank_transfer} Bank Transfer</option>
                    <option value="upi">{paymentIcons.upi} UPI</option>
                    <option value="check">{paymentIcons.check} Check</option>
                  </select>
                </div>
              </motion.div>

            </div>

            {/* Row 4: Note */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Additional Notes
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('note')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-11 pr-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 resize-none ${focusedField === 'note'
                      ? 'border-green-600 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300'
                    }`}
                  rows="4"
                  placeholder="Any additional details..."
                ></textarea>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitted}
              className="w-full relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Income Saved!
                  </motion.span>
                ) : (
                  <motion.span
                    key="submit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    {buttonName} Income
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                  repeatDelay: 1
                }}
              />
            </motion.button>

          </form>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">Success!</p>
                <p className="text-sm">Income {buttonName} successfully</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

export default AddIncome;