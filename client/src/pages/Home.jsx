import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, TrendingUp, Shield, Zap, CreditCard, PieChart, Bell, Smartphone, Coins } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">=</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinFusion</h1>
                <p className="text-xs text-gray-600">Smart finance, simplified.</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition">How it Works</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition">About</a>
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium transition">Login</Link>
              <Link to="/signup" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-emerald-600">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-emerald-600">How it Works</a>
              <a href="#about" className="block text-gray-700 hover:text-emerald-600">About</a>
              <Link to="/login" className="block text-emerald-600 font-medium">Login</Link>
              <Link to="/signup" className="block bg-emerald-500 text-white px-4 py-2 rounded-lg text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>



      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Your All-in-One Financial Platform
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Fusion of All Your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Finances</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A secure, centralized platform to manage all your bank accounts, cards, and transactions in one place — built with bank-grade encryption and privacy-first architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition transform hover:-translate-y-1 text-center">
                  Start Free Today
                </Link>
                <a href="#how-it-works" className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition text-center">
                  See How It Works
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="text-emerald-600" size={20} />
                  <span>Bank-level Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="text-emerald-600" size={20} />
                  <span>Real-time Updates</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-8 shadow-2xl transform rotate-3">
                <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="text-sm text-gray-600">Total Balance</p>
                        <p className="text-3xl font-bold text-gray-900">₹2,45,890</p>
                      </div>
                      <TrendingUp className="text-emerald-500" size={32} />
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'SBI Account', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg', bgColor: 'bg-blue-50', amount: 82000 },
                        { name: 'HDFC Account', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg', bgColor: 'bg-red-50', amount: 97000 },
                        { name: 'Kotak Account', logo: 'https://upload.wikimedia.org/wikipedia/en/7/74/Kotak_Mahindra_Bank_logo.svg', bgColor: 'bg-rose-50', amount: 112000 }
                      ].map((bank, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 ${bank.bgColor} rounded-lg p-2 shadow-sm border border-gray-200 flex items-center justify-center`}>
                              <img
                                src={bank.logo}
                                alt={bank.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = `<span class="text-lg font-bold text-gray-700">${bank.name.charAt(0)}</span>`;
                                }}
                              />
                            </div>
                            <span className="font-medium text-gray-900">{bank.name}</span>
                          </div>
                          <span className="text-emerald-600 font-semibold">₹{bank.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-600">Powerful features to manage your finances with ease</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CreditCard className="text-emerald-600" size={32} />,
                title: "Multi-Account Management",
                description: "View and manage all your bank accounts from different banks in a single, unified dashboard."
              },
              {
                icon: <Shield className="text-emerald-600" size={32} />,
                title: "Card & Cheque Services",
                description: "Request cheque books, block/unblock debit cards, and manage all card services instantly."
              },
              {
                icon: <TrendingUp className="text-emerald-600" size={32} />,
                title: "Fund Transfers",
                description: "Transfer money seamlessly between your linked accounts with secure authentication."
              },
              {
                icon: <Bell className="text-emerald-600" size={32} />,
                title: "Real-time Notifications",
                description: "Get instant alerts for transactions, low balances, and important account activities."
              },
              {
                icon: <PieChart className="text-emerald-600" size={32} />,
                title: "Expense Analytics",
                description: "Visual insights with charts and graphs to understand your spending patterns and budget better."
              },
              {
                icon: <Zap className="text-emerald-600" size={32} />,
                title: "Advanced Search & Filter",
                description: "Quickly find transactions with powerful search, sort, and filter capabilities."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-emerald-200 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How FinFusion Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Your Account", description: "Sign up with your email and secure your account with our bank-level encryption." },
              { step: "2", title: "Link Your Banks", description: "Securely connect your bank accounts using our encrypted integration with major banks." },
              { step: "3", title: "Manage Everything", description: "Access all your accounts, cards, transactions, and insights from one beautiful dashboard." }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-emerald-400 text-4xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Secure & Encrypted</h2>
            <p className="text-xl mb-8 opacity-90">Your financial data is protected with bank-level security and JWT authentication</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <Shield size={20} />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={20} />
                <span>JWT Authentication</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={20} />
                <span>Secure API Integration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* About Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About FinFusion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering Indians to take control of their financial future through unified account management
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border-2 border-emerald-100">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To simplify financial management for every Indian by providing a secure, unified platform that brings together all your bank accounts, cards, and transactions in one place. We believe managing money should be effortless, not overwhelming.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl border-2 border-teal-100">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India's most trusted financial management platform, helping millions make smarter financial decisions through real-time insights, seamless integration, and bank-level security that puts your peace of mind first.
              </p>
            </div>
          </div>

          {/* Problem We Solve */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">The Problem We Solve</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg transform -rotate-12 flex items-center justify-center">
                      <Smartphone className="text-white" size={24} />
                    </div>
                    <div className="absolute top-2 left-3 w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg transform rotate-6 flex items-center justify-center">
                      <Smartphone className="text-white" size={24} />
                    </div>
                    <div className="absolute top-4 left-6 w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl shadow-lg transform rotate-12 flex items-center justify-center">
                      <Smartphone className="text-white" size={24} />
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Multiple Apps Juggling</h4>
                <p className="text-gray-600 text-sm">Switching between 3-5 different banking apps daily is exhausting and time-consuming</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-2 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
                      <Coins className="text-yellow-500" size={20} />
                    </div>
                    <div className="absolute top-3 right-2 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.2s' }}>
                      <Coins className="text-yellow-600" size={16} />
                    </div>
                    <div className="absolute bottom-2 left-4 animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '1.8s' }}>
                      <Coins className="text-amber-500" size={18} />
                    </div>
                    <div className="absolute bottom-0 right-4 animate-bounce" style={{ animationDelay: '0.9s', animationDuration: '2.4s' }}>
                      <Coins className="text-yellow-400" size={14} />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-bold opacity-30">?</div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Lost Track of Money</h4>
                <p className="text-gray-600 text-sm">Hard to get a complete picture of your finances when spread across multiple banks</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Bell className="text-gray-300" size={48} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-1 bg-red-500 transform rotate-45 rounded-full"></div>
                    </div>
                    <div className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Missed Transactions</h4>
                <p className="text-gray-600 text-sm">Important alerts and transactions get lost in the noise of multiple notifications</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose FinFusion?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Built for India",
                  description: "Designed specifically for Indian banking ecosystem with support for all major banks including SBI, HDFC, ICICI, Kotak, and more."
                },
                {
                  title: "Bank-Level Security",
                  description: "We use the same encryption standards as banks. Your data is protected with 256-bit encryption and JWT authentication."
                },
                {
                  title: "Real-Time Sync",
                  description: "See your balances and transactions update instantly across all your accounts using Socket.io technology."
                },
                {
                  title: "Smart Analytics",
                  description: "Visual insights and spending patterns help you budget better and make informed financial decisions."
                },
                {
                  title: "No Hidden Fees",
                  description: "Transparent pricing with no surprise charges. What you see is what you get."
                },
                {
                  title: "24/7 Support",
                  description: "Our dedicated support team is always available to help you with any questions or concerns."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-emerald-50 transition">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-emerald-100">Banks Supported</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5K+</div>
                <div className="text-emerald-100">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-emerald-100">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-emerald-100">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Simplify Your Finances?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who manage all their bank accounts in one place
          </p>
          <Link to="/signup" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">=</span>
                </div>
                <span className="text-white font-bold text-lg">FinFusion</span>
              </div>
              <p className="text-sm">Smart finance, simplified.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-emerald-400 transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-emerald-400 transition">How it Works</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-emerald-400 transition">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">API Docs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 FinFusion. All rights reserved. Secure • Encrypted • Trusted</p>
          </div>
        </div>
      </footer>
    </div>
  );
}