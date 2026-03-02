import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiggyBank, IndianRupee, Check, Sparkles } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ExpenseService from "../services/expenseService";


function AddSavings() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    incomeId: "",
    amount: "",
    note: "",
    id: null,
  });

  const [incomeList, setIncomeList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [buttonName, setButton] = useState("Save");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch incomes for dropdown
  const fetchIncomes = async () => {
    try {
      const res = await ExpenseService.allIncomes()
      setIncomeList(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch savings by id (for update)
//   const fetchSavingsById = async (savingId) => {
//     try {
//       const res = await SavingsService.getSavingsById(savingId);
//       setForm(res.saving);
//       setButton("Update");
//     } catch (err) {
//       console.log(err);
//     }
//   };

  useEffect(() => {
    fetchIncomes();
    if (id) {
     // fetchSavingsById(id);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    ExpenseService.addToSavings(form)
      .then((res) => {
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
          setForm({
            incomeId: "",
            amount: "",
            id: null,
            note: ""
          });
          navigate("/addSavings");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg mb-4">
            <PiggyBank className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-indigo-900">
            Add Savings
          </h1>
          <p className="text-slate-600">
            Move your income into savings
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-2xl rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Income Dropdown */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Select Income
              </label>
              <select
                name="incomeId"
                value={form.incomeId}
                onChange={handleChange}
                className="w-full border-2 rounded-xl p-3"
                required
              >
                <option value="">Select Income</option>
                {incomeList.map((income) => (
                  <option key={income.id} value={income.id}>
                    {income.source} - ₹{income.amount}
                  </option>
                ))}
              </select>
            </div>
            

            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Amount to Save
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600" />
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border-2 rounded-xl"
                  placeholder="₹ 0"
                  required
                />
              </div>
            </div>

             <div>
              <label className="block text-sm font-semibold mb-2">
                Note
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600" />
                <input
                  type="text"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border-2 rounded-xl"
                  placeholder="Note"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-4 rounded-xl font-bold"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.span
                    key="saved"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Savings Saved!
                  </motion.span>
                ) : (
                  <motion.span
                    key="save"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    {buttonName} Savings
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AddSavings;