import React from 'react'
import { Link } from "react-router-dom"

function Support() {
  const categories = [
    { title: "Getting Started", desc: "Set up your account and link your first loan.", icon: "rocket_launch", color: "bg-emerald-100" },
    { title: "Payment & EMI", desc: "Manage schedules and payment methods.", icon: "payments", color: "bg-slate-100" },
    { title: "Loan Management", desc: "Refinancing, payoffs, and early settlement.", icon: "account_balance", color: "bg-emerald-100" },
    { title: "Security & Privacy", desc: "Data encryption and privacy controls.", icon: "lock", color: "bg-slate-100" },
    { title: "Account Settings", desc: "Notification preferences and bio data.", icon: "settings", color: "bg-emerald-100" },
  ];

  return (
    <div className="h-screen w-full bg-white font-sans overflow-hidden flex flex-col ">
      {/* Icon Support Link */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      
      {/* Navbar - Clean white background for contrast */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex justify-between items-center h-20 px-16 w-full">
          <div className="text-4xl font-bold tracking-tighter text-[#182820] font-medium">
            Debt<span className="text-green-950">IQ</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 font-bold text-xs uppercase tracking-widest text-gray-400">
            <Link className="hover:text-[#182820] transition-colors" to="/">Dashboard</Link>
            <Link className="hover:text-[#182820] transition-colors" to="/">Loans</Link>
            <Link className="hover:text-[#182820] transition-colors" to="/">Insights</Link>
          </nav>
          <div className="flex items-center gap-4 ">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-all text-[#182820]">
              <span className="material-symbols-outlined block">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-emerald-950 flex items-center justify-center text-white font-bold">A</div>
          </div>
        </div>
      </header>

      {/* Main Body - Restored your bg-slate-200/50 sanctuary contrast */}
      <main className="flex-1 overflow-y-auto bg-slate-200/50 custom-scrollbar">
        
        {/* Hero Section - Matching Reference Gradient */}
        <section className="bg-[radial-gradient(circle_at_top_right,#d4e7da_0%,#f6faff_70%)] py-20 px-16 relative">
          {/* Background Dot Pattern[cite: 2] */}
          <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_2px_2px,rgba(24,40,32,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
          
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-5xl font-bold text-[#182820] leading-tight">How can we help you today?</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Find answers to your questions about loan management and financial freedom.
            </p>
            <div className="relative max-w-2xl mx-auto mt-12">
              <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-[#182820]/40">search</span>
              <input 
                className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-2xl shadow-sm text-md focus:ring-2 focus:ring-emerald-950/10 transition-all outline-none" 
                placeholder="Search for topics, articles, or keywords..." 
                type="text"
              />
            </div>
          </div>
        </section>

        {/* Category Grid - Using your rounded-3xl geometry[cite: 1, 2] */}
        <section className="max-w-7xl mx-auto py-16 px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-white p-8 rounded-[2rem] shadow-sm group hover:bg-[#182820] transition-all duration-300 cursor-pointer border border-slate-100">
                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors`}>
                  <span className="material-symbols-outlined text-[#182820] group-hover:text-white">{cat.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#182820] group-hover:text-white mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-500 group-hover:text-white/70 leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section - Emerald-950 sanctuary card[cite: 1, 2] */}
        <section className="max-w-7xl mx-auto px-16 mb-20">
          <div className="bg-[#182820] text-white rounded-[3rem] p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="relative z-10 max-w-xl text-left">
              <h2 className="text-4xl font-bold mb-6">Still need help?</h2>
              <p className="text-emerald-100/60 text-lg mb-8">Our support team is available 24/7 to help you navigate your journey.</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-[#182820] px-8 py-4 rounded-full font-bold hover:bg-emerald-50 active:scale-[0.98] transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined">forum</span> Live Chat
                </button>
                <button className="border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 active:scale-[0.98] transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined">mail</span> Email Support
                </button>
              </div>
            </div>
            
            <div className="relative z-10 bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 w-full md:w-80">
              <h4 className="text-xl font-bold mb-4">Community</h4>
              <p className="text-sm text-emerald-100/50 mb-6">Join members sharing strategies and success stories.</p>
              <Link className="text-white font-bold flex items-center gap-2 group" to="/">
                Browse Forum <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </div>
            {/* Sanctuary decorative blur[cite: 1, 2] */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Footer[cite: 2] */}
        <footer className="bg-white py-12 px-16 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
            <div className="text-xl font-bold text-[#182820]">DebtIQ</div>
            <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              <Link className="hover:text-[#182820] transition-colors" to="/">Privacy</Link>
              <Link className="hover:text-[#182820] transition-colors" to="/">Terms</Link>
              <Link className="hover:text-[#182820] transition-colors" to="/">Security</Link>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              © 2026 DebtIQ — Financial Wellness.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Support