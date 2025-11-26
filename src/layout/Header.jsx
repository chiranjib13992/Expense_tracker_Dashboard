import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserPayload, logout } from "./../services/global.service";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Header() {
    const [userName, setUserName] = useState("Guest");
    const [openExpense, setOpenExpense] = useState(false);

    useEffect(() => {
        const userDetails = getUserPayload();
        setUserName(userDetails ? userDetails.name : "Guest");
    }, []);

    return (
        <header className="w-full bg-white border-b shadow-sm relative z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LEFT – LOGO */}
                <div className="flex items-center gap-3">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                        alt="logo"
                        className="w-7 h-7"
                    />
                    <span className="text-xl font-semibold">BudgetBuddy</span>
                </div>

                {/* CENTER – NAV */}
                <nav className="hidden md:block">
                    <ul className="flex items-center space-x-8 text-sm font-medium text-gray-700">



                        <li className="flex items-center gap-1 cursor-pointer hover:text-black">
                            <span>Dashboard</span>
                            <ChevronDown size={16} />
                        </li>

                        <li className="relative">
                            <div
                                onClick={() => setOpenExpense(!openExpense)}
                                className="flex items-center gap-1 cursor-pointer hover:text-black select-none"
                            >
                                <span>Expenses</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${openExpense ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {/* Dropdown */}
                            {openExpense && (
                                <div
                                    className="absolute left-0 mt-2 w-44 bg-white shadow-lg rounded-lg border
                         z-50 transition-all duration-200"
                                >
                                    <li
                                        to="/allExpenses"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                    >
                                        All Expenses
                                    </li>

                                    <li
                                        to="/addExpenses"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                                    >
                                        Add Expense
                                    </li>
                                </div>
                            )}
                        </li>

                        <li className="flex items-center gap-1 cursor-pointer hover:text-black">
                            <span>Resources</span>
                            <ChevronUp size={16} />
                        </li>



                        <li className="flex items-center gap-1 cursor-pointer hover:text-black">
                            <span>Blog</span>
                            <ChevronDown size={16} />
                        </li>

                    </ul>
                </nav>

                {/* RIGHT – USER INFO */}
                <div className="flex items-center gap-3 cursor-pointer group">

                    <img
                        src="https://i.pravatar.cc/40"
                        alt="avatar"
                        className="w-9 h-9 rounded-full object-cover"
                    />

                    <span className="text-sm font-medium text-gray-800">
                        {userName}
                    </span>

                    <ChevronDown size={18} className="text-gray-500 group-hover:text-black" />

                    <button
                        onClick={logout}
                        className="ml-4 text-sm text-gray-500 hover:text-red-500 transition"
                    >
                        Log Out
                    </button>
                </div>

            </div>
        </header>
    );
}
