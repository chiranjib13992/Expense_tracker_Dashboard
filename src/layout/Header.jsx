import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserPayload, logout } from "./../services/global.service";
import { ChevronDown, LayoutDashboard, Receipt, BookOpen, FileText, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [userName, setUserName] = useState("Guest");
    const [openExpense, setOpenExpense] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const userDetails = getUserPayload();
        setUserName(userDetails ? userDetails.name : "Guest");
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenExpense(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LEFT – LOGO */}
                    <span to="/" className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg group-hover:shadow-lg transition-all">
                            <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                            BudgetBuddy
                        </span>
                    </span>

                    {/* CENTER – NAV */}
                    <nav className="hidden md:flex items-center space-x-1">

                        {/* Dashboard Link */}
                        <div
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
                        >
                            <LayoutDashboard size={16} />
                            <span>Dashboard</span>
                        </div>



                        {/* Resources Link */}
                        <div
                             onClick={() => navigate("/resources")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all"
                        >
                            <BookOpen size={16} />
                            <span>Resources</span>
                        </div>

                        {/* Blog Link */}
                        <div
                             onClick={() => navigate("/blog")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all"
                        >
                            <FileText size={16} />
                            <span>Blog</span>
                        </div>

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
            </div>
        </header>
    );
}