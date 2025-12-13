import React, { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';

import { useNavigate } from "react-router-dom";
import ExpenseService from '../Expenses/services/expenseService';
import TransactionButton from './TransactionButton';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('month');
  const navigate = useNavigate();
  const [recentTransactions, setExpenses] = useState([]);
  const [categoryExpenses, setCategoryExpenses] = useState([]);

  // Sample data
  const stats = {
    balance: 12450.50,
    income: 8500.00,
    expenses: 5250.75,
    savings: 3249.25
  };

  // const recentTransactions = [
  //   { id: 1, name: 'Grocery Shopping', category: 'Food', amount: -125.50, date: '2024-12-12', type: 'expense' },
  //   { id: 2, name: 'Salary Deposit', category: 'Income', amount: 5000.00, date: '2024-12-10', type: 'income' },
  //   { id: 3, name: 'Electric Bill', category: 'Utilities', amount: -89.99, date: '2024-12-09', type: 'expense' },
  //   { id: 4, name: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: '2024-12-08', type: 'expense' },
  //   { id: 5, name: 'Freelance Project', category: 'Income', amount: 1200.00, date: '2024-12-07', type: 'income' },
  // ];

  useEffect(() => {
    ExpenseService.allExpenses()
      .then((res) => {
        setExpenses(res.allExpenses);
      })
      .catch((err) => console.log(err));
    ExpenseService.categoryWiseSpending()
      .then((res) => {
        console.log(res, 'res')
        setCategoryExpenses(res.categoryExpenses);
      }).catch((err) => console.log(err));
  }, [])

  // const categoryExpenses = [
  //   { category: 'Food', amount: 850, color: 'bg-blue-500', percentage: 32 },
  //   { category: 'Transport', amount: 420, color: 'bg-purple-500', percentage: 16 },
  //   { category: 'Utilities', amount: 380, color: 'bg-green-500', percentage: 14 },
  //   { category: 'Entertainment', amount: 290, color: 'bg-orange-500', percentage: 11 },
  //   { category: 'Others', amount: 710, color: 'bg-pink-500', percentage: 27 },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Budget Buddy
              </h1>
            </div>
            <TransactionButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Filter */}
        <div className="flex gap-2 mb-6">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              style={{ backgroundColor: "#2563eb" }}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${timeframe === period
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-slate-500">Total Balance</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800">${stats.balance.toLocaleString()}</h3>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +12.5% from last month
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-slate-500">Income</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800">${stats.income.toLocaleString()}</h3>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +8.2% from last month
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-slate-500">Expenses</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800">${stats.expenses.toLocaleString()}</h3>
            <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
              <ArrowDownRight className="w-4 h-4" />
              +3.1% from last month
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-slate-500">Savings</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800">${stats.savings.toLocaleString()}</h3>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +18.7% from last month
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Recent Transactions</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{transaction.item}</p>
                      <p className="text-sm text-slate-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(transaction.expense_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spending by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Spending by Category</h2>
            <div className="space-y-4">
              {categoryExpenses.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.category}</span>
                    <span className="text-sm font-semibold text-slate-800">${item.amount}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{item.percentage}% of total</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Total Expenses</span>
                <span className="font-bold text-slate-800">$2,650</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}