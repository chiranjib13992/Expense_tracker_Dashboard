import { Link } from "react-router-dom";

export default function HeaderNav() {
  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <div className="text-xl font-semibold tracking-tight">
          BudgetBuddy
        </div>

        {/* CENTER — MENU */}
        <ul className="flex items-center space-x-10 text-sm font-medium text-gray-700">
          <li>
            <Link to="/dashboard" className="hover:text-gray-900">
              Home
            </Link>
          </li>

          <li className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
            <span>Products</span>
            <span className="text-xs">▼</span>
          </li>

          <li className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
            <span>Resources</span>
            <span className="text-xs">▲</span>
          </li>

          <li>
            <Link to="/pricing" className="hover:text-gray-900">
              Pricing
            </Link>
          </li>

          <li className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
            <span>Blog</span>
            <span className="text-xs">▼</span>
          </li>
        </ul>

        {/* RIGHT — USER PROFILE */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800">
            Frankie Sullivan
          </span>
          <span className="text-xs">▼</span>
        </div>

      </div>
    </nav>
  );
}
