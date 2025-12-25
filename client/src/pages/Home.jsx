import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, TrendingUp, Shield, Zap, CreditCard, PieChart, Bell, Smartphone, Coins } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:shadow-emerald-300 transition-all duration-300 transform group-hover:scale-105">
                <span className="text-white font-bold text-xl">=</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-emerald-700 transition-colors">FinFusion</h1>
                <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider">Smart Finance</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors relative group">
                How it Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
              </a>
              <div className="h-6 w-px bg-gray-200"></div>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Login</Link>
              <Link to="/signup" className="group relative px-6 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fade-in-up">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-base font-medium text-gray-600 hover:text-emerald-600 px-2">Features</a>
              <a href="#how-it-works" className="block text-base font-medium text-gray-600 hover:text-emerald-600 px-2">How it Works</a>
              <a href="#about" className="block text-base font-medium text-gray-600 hover:text-emerald-600 px-2">About</a>
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-4">
                <Link to="/login" className="block text-center text-base font-medium text-gray-600 hover:text-emerald-600">Login</Link>
                <Link to="/signup" className="block w-full text-center bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-emerald-200">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/50 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-50/50 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-white border border-emerald-100 rounded-full px-4 py-1.5 mb-8 shadow-sm shadow-emerald-50">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-medium text-emerald-800">New: Smart Budgeting AI</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Master your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 animate-gradient-x">
                  money flow
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                Experience the future of finance with FinFusion. One platform to track, manage, and grow your wealth with bank-grade security.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="group relative px-8 py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-lg shadow-xl shadow-emerald-200 hover:shadow-2xl hover:shadow-emerald-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden text-center">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Free Trial
                    <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <a href="#how-it-works" className="px-8 py-4 rounded-2xl bg-white text-gray-700 font-semibold text-lg border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 transition-all duration-300 text-center flex items-center justify-center gap-2">
                  <PieChart size={20} />
                  See Demo
                </a>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="text-emerald-500" size={18} />
                  <span>256-bit Security</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Zap className="text-emerald-500" size={18} />
                  <span>Instant Sync</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Smartphone className="text-emerald-500" size={18} />
                  <span>Mobile First</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center animate-scale-in delay-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/50 to-teal-100/50 rounded-[3rem] transform rotate-6 scale-95 blur-2xl"></div>

              <div className="relative w-full max-w-md bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/50 ring-1 ring-gray-100">
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-bounce-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Income</p>
                      <p className="text-sm font-bold text-gray-900">+₹45,000</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-bounce-subtle delay-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                      <Zap size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Saved</p>
                      <p className="text-sm font-bold text-gray-900">₹12,400</p>
                    </div>
                  </div>
                </div>

                {/* Main Card Content */}
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Total Balance</p>
                      <h3 className="text-4xl font-bold text-gray-900 tracking-tight">₹2,45,890</h3>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-xl">
                      <TrendingUp className="text-emerald-600" size={24} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'SBI Account', logo: 'S', color: 'bg-blue-600', amount: 82000 },
                      { name: 'HDFC Bank', logo: 'H', color: 'bg-red-600', amount: 97000 },
                      { name: 'Kotak Bank', logo: 'K', color: 'bg-rose-600', amount: 112000 }
                    ].map((bank, i) => (
                      <div key={i} className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${bank.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-gray-200`}>
                            {bank.logo}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{bank.name}</p>
                            <p className="text-xs text-gray-500">**** 8842</p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900">₹{bank.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Monthly Limit</span>
                      <span className="font-bold text-gray-900">65% Used</span>
                    </div>
                    <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-600 leading-relaxed">Powerful features designed to give you complete control over your financial life, all in a single dashboard.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CreditCard className="text-white" size={24} />,
                title: "Multi-Account Management",
                description: "View and manage all your bank accounts from different banks in a single, unified dashboard.",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: <Shield className="text-white" size={24} />,
                title: "Card & Cheque Services",
                description: "Request cheque books, block/unblock debit cards, and manage all card services instantly.",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: <TrendingUp className="text-white" size={24} />,
                title: "Fund Transfers",
                description: "Transfer money seamlessly between your linked accounts with secure authentication.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Bell className="text-white" size={24} />,
                title: "Real-time Notifications",
                description: "Get instant alerts for transactions, low balances, and important account activities.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: <PieChart className="text-white" size={24} />,
                title: "Expense Analytics",
                description: "Visual insights with charts and graphs to understand your spending patterns and budget better.",
                color: "from-teal-500 to-cyan-500"
              },
              {
                icon: <Zap className="text-white" size={24} />,
                title: "Advanced Search & Filter",
                description: "Quickly find transactions with powerful search, sort, and filter capabilities.",
                color: "from-yellow-500 to-amber-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-emerald-100/50 hover:border-emerald-100 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-emerald-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">How FinFusion Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-12">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 border-t-2 border-dashed border-emerald-300/50 z-0"></div>

            {[
              { step: "1", title: "Create Account", description: "Sign up with your email and secure your account with our bank-level encryption." },
              { step: "2", title: "Link Banks", description: "Securely connect your bank accounts using our encrypted integration with major banks." },
              { step: "3", title: "Manage All", description: "Access all your accounts, cards, transactions, and insights from one beautiful dashboard." }
            ].map((item, index) => (
              <div key={index} className="relative z-10">
                <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-emerald-100/50 border border-emerald-50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 group text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300 transform rotate-3 group-hover:rotate-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="relative p-12 md:p-20 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Secure & Encrypted</h2>
              <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto font-light">Your financial data is protected with bank-level security, 256-bit encryption, and advanced JWT authentication.</p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-12">
                {[
                  { icon: <Shield size={24} />, text: "256-bit Encryption" },
                  { icon: <Shield size={24} />, text: "JWT Authentication" },
                  { icon: <Shield size={24} />, text: "Secure API Integration" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                    {item.icon}
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">About FinFusion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering Indians to take control of their financial future through unified account management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To simplify financial management for every Indian by providing a secure, unified platform that brings together all your bank accounts, cards, and transactions in one place. We believe managing money should be effortless.
                </p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-100 transition-colors duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 text-teal-600">
                  <Shield size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become India's most trusted financial management platform, helping millions make smarter financial decisions through real-time insights, seamless integration, and bank-level security.
                </p>
              </div>
            </div>
          </div>

          {/* Problem We Solve */}
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">The Problem We Solve</h3>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg transform -rotate-12 flex items-center justify-center z-10">
                      <Smartphone className="text-white" size={28} />
                    </div>
                    <div className="absolute top-2 left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg transform rotate-6 flex items-center justify-center z-20">
                      <Smartphone className="text-white" size={28} />
                    </div>
                    <div className="absolute top-4 left-8 w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-lg transform rotate-12 flex items-center justify-center z-30">
                      <Smartphone className="text-white" size={28} />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">App Fatigue</h4>
                <p className="text-gray-600">Switching between 3-5 different banking apps daily is exhausting and time-consuming.</p>
              </div>

              <div className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute top-0 left-2 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
                      <Coins className="text-yellow-500" size={24} />
                    </div>
                    <div className="absolute top-4 right-2 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.2s' }}>
                      <Coins className="text-yellow-600" size={20} />
                    </div>
                    <div className="absolute bottom-2 left-4 animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '1.8s' }}>
                      <Coins className="text-amber-500" size={22} />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 text-4xl font-bold opacity-20">?</div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Money Blindness</h4>
                <p className="text-gray-600">Hard to get a complete picture of your finances when spread across multiple banks.</p>
              </div>

              <div className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Bell className="text-gray-200" size={64} />
                    </div>
                    <div className="absolute top-2 right-4 w-5 h-5 bg-red-500 rounded-full animate-ping"></div>
                    <div className="absolute top-2 right-4 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-[10px] font-bold">!</span>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Missed Alerts</h4>
                <p className="text-gray-600">Important alerts and transactions get lost in the noise of multiple notifications.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "10+", label: "Banks Supported" },
              { number: "5K+", label: "Active Users" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-white to-emerald-200 bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-emerald-200 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
            Ready to Simplify Your Finances?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of users who manage all their bank accounts in one place. Start your journey to financial freedom today.
          </p>
          <Link to="/signup" className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Get Started Free
            <TrendingUp size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
                  <span className="text-white font-bold text-xl">=</span>
                </div>
                <span className="text-white font-bold text-2xl tracking-tight">FinFusion</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">Smart finance, simplified. The only platform you need to manage your entire financial life.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">API Docs</a></li>
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