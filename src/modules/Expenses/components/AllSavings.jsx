import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiggyBank, IndianRupee, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ExpenseService from "../services/expenseService";

function AllSavings() {
  const [savings, setSavings] = useState([]);
  const navigate = useNavigate();

  const fetchSavings = async () => {
    try {
      const res = await ExpenseService.getAllSavings();
      setSavings(res.savings || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSavings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this saving?")) return;

    try {
      await SavingsService.deleteSavings(id);
      fetchSavings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-indigo-900">
              All Savings
            </h1>
          </div>

          <button
            onClick={() => navigate("/addSavings")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md"
          >
            + Add Savings
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-indigo-100">
              <tr>
                <th className="p-4">Income Source</th>
                <th className="p-4">Income Amount</th>
                <th className="p-4">Saved Amount</th>
                <th className="p-4">Note</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {savings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-slate-500">
                    No savings found
                  </td>
                </tr>
              ) : (
                savings.map((item) => (
                  <motion.tr
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    className="border-b hover:bg-indigo-50 transition-all"
                  >
                    <td className="p-4 font-semibold text-slate-800">
                      {item.source}
                    </td>

                    <td className="p-4 text-slate-600">
                      ₹ {item.income_amount}
                    </td>

                    <td className="p-4 text-indigo-700 font-bold">
                      ₹ {item.amount}
                    </td>

                    <td className="p-4 text-slate-600">
                      {item.note}
                    </td>

                    <td className="p-4 text-center flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/editSavings/${item.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllSavings;