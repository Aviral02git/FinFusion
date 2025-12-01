import { Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm border-b border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>

      <div className="flex items-center gap-5">
        <button className="relative p-2 text-gray-600 hover:text-emerald-600 transition rounded-lg hover:bg-emerald-50">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition">
          <User size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}
