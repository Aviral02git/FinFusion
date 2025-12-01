import { Home, BarChart, CreditCard, Bell, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/insights", icon: BarChart, label: "Insights" },
    { path: "/cards", icon: CreditCard, label: "Cards" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
  ];

  return (
    <>
      {/* Backdrop - Click to close sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-900 p-6 flex flex-col gap-6 border-r border-gray-200 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">₹</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FinFusion</h1>
              <p className="text-xs text-emerald-600">Smart finance</p>
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose} // Close sidebar on mobile when clicking a link
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
              >
                <Icon size={20} /> {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
