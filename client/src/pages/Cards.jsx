import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AddCardModal from "../components/AddCardModal";
import { CreditCard, Lock, Unlock, Plus, Trash2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function Cards() {
    const [showAddCardModal, setShowAddCardModal] = useState(false);
    const [cards, setCards] = useState([]);

    // Load cards from localStorage on mount
    useEffect(() => {
        const savedCards = localStorage.getItem('finfusion_cards');
        if (savedCards) {
            setCards(JSON.parse(savedCards));
        } else {
            // Initialize with placeholder cards if none exist
            const initialCards = [
                { id: 1, type: "DEBIT", bank: "SBI", last4: "4321", color: "from-blue-500 to-blue-600", cardHolderName: "JOHN DOE" },
                { id: 2, type: "CREDIT", bank: "HDFC", last4: "8765", color: "from-purple-500 to-purple-600", cardHolderName: "JOHN DOE" },
                { id: 3, type: "DEBIT", bank: "ICICI", last4: "1234", color: "from-orange-500 to-orange-600", cardHolderName: "JOHN DOE" }
            ];
            setCards(initialCards);
            localStorage.setItem('finfusion_cards', JSON.stringify(initialCards));
        }
    }, []);

    const handleCardAdded = (newCardData) => {
        // Extract last 4 digits from card number
        const cardNumber = newCardData.cardNumber.replace(/\s/g, '');
        const last4 = cardNumber.slice(-4);

        // Assign color based on card type and existing cards
        const colors = [
            "from-blue-500 to-blue-600",
            "from-purple-500 to-purple-600",
            "from-orange-500 to-orange-600",
            "from-teal-500 to-teal-600",
            "from-pink-500 to-pink-600",
            "from-indigo-500 to-indigo-600",
            "from-green-500 to-green-600",
        ];
        const colorIndex = cards.length % colors.length;

        const newCard = {
            id: Date.now(), // Use timestamp as ID
            type: newCardData.cardType,
            bank: newCardData.bank,
            last4: last4,
            color: colors[colorIndex],
            cardHolderName: newCardData.cardHolderName,
            expiryMonth: newCardData.expiryMonth,
            expiryYear: newCardData.expiryYear
        };

        // Add to state
        const updatedCards = [...cards, newCard];
        setCards(updatedCards);

        // Save to localStorage
        localStorage.setItem('finfusion_cards', JSON.stringify(updatedCards));

        // Show success toast
        toast.success('Card added successfully! 🎉', {
            duration: 3000,
            position: 'top-right',
            style: {
                background: '#10b981',
                color: '#fff',
                padding: '16px',
                borderRadius: '12px',
            },
        });
    };

    const handleDeleteCard = (cardId) => {
        const updatedCards = cards.filter(card => card.id !== cardId);
        setCards(updatedCards);
        localStorage.setItem('finfusion_cards', JSON.stringify(updatedCards));

        toast.success('Card removed successfully', {
            duration: 2000,
            position: 'top-right',
            style: {
                background: '#ef4444',
                color: '#fff',
                padding: '16px',
                borderRadius: '12px',
            },
        });
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <Toaster />
            <Sidebar />

            <div className="flex-1">
                <Topbar />

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6 animate-fade-in-up">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Cards</h1>
                            <p className="text-gray-600 mt-1">Manage your debit and credit cards</p>
                        </div>
                        <button
                            onClick={() => setShowAddCardModal(true)}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition hover-lift flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add Card
                        </button>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {cards.map((card, i) => (
                            <div key={card.id} className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl shadow-lg text-white hover-lift animate-fade-in-up group relative`} style={{ animationDelay: `${i * 0.1}s` }}>
                                {/* Delete button */}
                                <button
                                    onClick={() => handleDeleteCard(card.id)}
                                    className="absolute top-4 right-4 bg-white/20 hover:bg-red-500 p-2 rounded-lg transition opacity-0 group-hover:opacity-100"
                                    title="Delete card"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-sm font-medium opacity-90">{card.type === 'DEBIT' ? 'Debit' : 'Credit'} Card</span>
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
                                    {card.expiryMonth && card.expiryYear && (
                                        <div className="text-right">
                                            <p className="text-xs opacity-75">Expires</p>
                                            <p className="font-semibold">{card.expiryMonth}/{card.expiryYear}</p>
                                        </div>
                                    )}
                                    <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                                        <Lock size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-emerald-100 text-center hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <CreditCard className="text-emerald-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Cards Management</h3>
                        <p className="text-gray-600">Block/unblock cards, request new cards, and manage all your card services from here.</p>
                    </div>
                </div>
            </div>

            {/* Add Card Modal */}
            <AddCardModal
                isOpen={showAddCardModal}
                onClose={() => setShowAddCardModal(false)}
                onSuccess={handleCardAdded}
            />
        </div>
    );
}
