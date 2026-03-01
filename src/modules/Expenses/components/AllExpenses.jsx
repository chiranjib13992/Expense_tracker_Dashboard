import React, { useEffect, useState } from "react";
import ExpenseService from "../services/expenseService";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Tag,
  CreditCard,
  FileText,
  AlignLeft,
  Check,
  Sparkles,
  TrendingDown,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function AllExpenses() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [allExpenses, setExpenses] = useState([]);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [openRowId, setOpenRowId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savingStatus, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();


  const recordsPerPage = 10;

  const filteredExpenses = allExpenses.filter((exp) => {
    const expenseDate = new Date(exp.income_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && expenseDate < start) return false;
    if (end && expenseDate > end) return false;

    if (paymentMethod !== 'all' && exp.payment_method !== paymentMethod) {
      return false;
    }

    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredExpenses.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredExpenses.slice(indexOfFirstRecord, indexOfLastRecord);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterSetter, value) => {
    filterSetter(value);
    setCurrentPage(1);
  };

  const handleEdit = (data) => {
  console.log("Edit clicked:", data);
   navigate(`/editExpenses/${data.id}`);
  // open modal or navigate to edit page
};

  useEffect(() => {
    ExpenseService.allExpenses()
      .then((res) => {
        setExpenses(res.allExpenses);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Expenses</h1>

      {/* Filters Section */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Start Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleFilterChange(setStartDate, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleFilterChange(setEndDate, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Payment Method Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => handleFilterChange(setPaymentMethod, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Methods</option>
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="net_banking">Net Banking</option>
            </select>
          </div>
        </div>


        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setStartDate('');
            setEndDate('');
            setPaymentMethod('all');
            setCurrentPage(1);
          }}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition btn btn-primary"
        >
          Clear Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredExpenses.length > 0 ? indexOfFirstRecord + 1 : 0}-{Math.min(indexOfLastRecord, filteredExpenses.length)} of {filteredExpenses.length} expenses
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((exp, index) => (
                <motion.tr
                  key={exp.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(exp.income_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-semibold text-gray-800">{exp.source}</div>
                    {exp.note && (
                      <div className="text-xs text-gray-500 italic mt-1">
                        "{exp.note}"
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {exp.descriptions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 capitalize">
                      {exp.payment_method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ₹ {exp.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {exp.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 relative">
                    <button
                      onClick={() =>
                        setOpenRowIndex(openRowIndex === index ? null : index)
                      }
                      className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      ⋮
                    </button>

                    {openRowIndex === index && (
                      <div className="absolute right-6 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20">
                        <button
                          onClick={() => {
                            setOpenRowIndex(null);
                            handleEdit(exp);   // Your edit function
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>


                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredExpenses.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No expenses found matching your filters
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredExpenses.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg transition ${currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 rounded-lg transition ${currentPage === pageNumber
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg transition ${currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            Next
          </button>
        </div>
      )}
      <AnimatePresence>
        {isSaved && (
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
              <p className="text-sm">{savingStatus}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed bottom-8 right-8 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <X className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold">Error!</p>
              <p className="text-sm">{savingStatus}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
