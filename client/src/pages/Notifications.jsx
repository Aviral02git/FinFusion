import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Bell, AlertCircle, CheckCircle, Info, TrendingUp } from "lucide-react";

export default function Notifications() {
    const notifications = [
        { type: "success", icon: CheckCircle, title: "Payment Successful", message: "Your payment of ₹2,500 was successful", time: "2 hours ago", color: "emerald" },
        { type: "alert", icon: AlertCircle, title: "Low Balance Alert", message: "Your SBI account balance is below ₹5,000", time: "5 hours ago", color: "red" },
        { type: "info", icon: Info, title: "New Feature Available", message: "Check out our new spending insights feature", time: "1 day ago", color: "blue" },
        { type: "success", icon: TrendingUp, title: "Salary Credited", message: "₹85,000 credited to your account", time: "2 days ago", color: "emerald" }
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <Sidebar />

            <div className="flex-1">
                <Topbar />

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-gray-600 mt-1">Stay updated with your account activities</p>
                        </div>
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Mark all as read
                        </button>
                    </div>

                    {/* Notifications list */}
                    <div className="space-y-4 mb-6">
                        {notifications.map((notif, i) => {
                            const Icon = notif.icon;
                            return (
                                <div key={i} className="bg-white p-5 rounded-2xl shadow-lg border-2 border-emerald-100 hover:border-emerald-200 transition">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 bg-${notif.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={`text-${notif.color}-600`} size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-1">
                                                <h3 className="font-bold text-gray-900">{notif.title}</h3>
                                                <span className="text-xs text-gray-500">{notif.time}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">{notif.message}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-emerald-100 text-center">
                        <Bell className="text-emerald-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
                        <p className="text-gray-600">You've seen all your recent notifications.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
