import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { CreditCard, Lock, Unlock, Plus } from "lucide-react";

export default function Cards() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <Sidebar />

            <div className="flex-1">
                <Topbar />

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Cards</h1>
                            <p className="text-gray-600 mt-1">Manage your debit and credit cards</p>
                        </div>
                        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2">
                            <Plus size={20} />
                            Add Card
                        </button>
                    </div>

                    {/* Placeholder cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {[
                            { type: "Debit", bank: "SBI", last4: "4321", color: "from-blue-500 to-blue-600" },
                            { type: "Credit", bank: "HDFC", last4: "8765", color: "from-purple-500 to-purple-600" },
                            { type: "Debit", bank: "ICICI", last4: "1234", color: "from-orange-500 to-orange-600" }
                        ].map((card, i) => (
                            <div key={i} className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl shadow-lg text-white`}>
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-sm font-medium opacity-90">{card.type} Card</span>
                                    <CreditCard size={24} />
                                </div>
                                <div className="mb-6">
                                    <p className="text-sm opacity-75 mb-1">Card Number</p>
                                    <p className="text-xl font-bold tracking-wider">•••• •••• •••• {card.last4}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs opacity-75">Bank</p>
                                        <p className="font-semibold">{card.bank}</p>
                                    </div>
                                    <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                                        <Lock size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-emerald-100 text-center">
                        <CreditCard className="text-emerald-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Cards Management</h3>
                        <p className="text-gray-600">Block/unblock cards, request new cards, and manage all your card services from here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
