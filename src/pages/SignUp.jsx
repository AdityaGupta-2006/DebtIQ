import React from 'react'
import { Link } from "react-router-dom"

function SignUp() {
  return (
    // h-screen and overflow-hidden to prevent any scrolling[cite: 1]
    <div className="h-screen w-full bg-slate-50 font-sans overflow-hidden flex flex-col">
      
      {/* Navbar - Matches your Home page layout[cite: 1] */}
      <nav className='py-3 flex px-16 z-10'>
        <div className="flex items-center justify-center flex-1 md:-ml-8">
          <Link to="/">
            <h1 className="font-bebas text-4xl tracking-wider text-gray-900 font-medium">
              Debt<span className="text-green-950">IQ</span>
            </h1>
          </Link>
        </div>
        <div className='flex-4 my-auto'></div>
        <div className='flex-0 flex justify-center items-center gap-10 whitespace-nowrap'>
          <p className="text-gray-900 hover:text-black transition-all font-medium">
            <Link to="/support">Support</Link>
          </p>
        </div>
      </nav>

      {/* Main Container - Split Layout[cite: 1] */}
      <main className="flex-1 flex items-center justify-center bg-slate-200/50 px-10 pb-10">
        
        <div className="flex w-full max-w-6xl h-[90%] bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Left Side: Supportive Hero[cite: 1] */}
          <div className="hidden lg:flex flex-1 relative bg-emerald-950 p-12 flex flex-col justify-center overflow-hidden">
            {/* Background Image[cite: 1] */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIydbpAuKPPYpHvgw_rf0WpZlDktQfO8Z9gbS01M0kqOLsBOYo12SI0FFQXVpHAeOYzSZCJmIAn_GZj5KIjcATOD7shxOK74as5-TZBgocsuXGGalrchofpj5_mqQTBUaKBbAKjNpRuNQvtzadKC-HXaaWLsuKvqHnehvBnHghmRJ0iLtOcko0di5nKBsMV9pJDwC0ZdxoKoGctPViw_dD33s2hgJDOEVzP1b_Ouaofb-dSNH81osnmrgQdXf94OzZbDOn7PFsb9jT"
                alt="Serene Sanctuary Background"
              />
            </div>

            {/* Hero Content[cite: 1] */}
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-800/50 rounded-2xl shadow-lg">
                <span className="text-white text-4xl">🌿</span>
              </div>
              
              <h1 className="text-white text-5xl font-bold leading-tight">
                Start Your Journey <br/> to Financial Freedom
              </h1>
              
              <p className="text-emerald-100/70 text-lg max-w-md">
                Join DebtIQ to transform your relationship with money. Our supportive tools guide you toward a future of stability and quiet confidence.
              </p>
              
              <div className="pt-8 space-y-4">
                {[
                  "Personalized debt payoff strategies",
                  "Supportive, anxiety-free interface",
                  "Clear insights into long-term growth"
                ].map((text) => (
                  <div key={text} className="flex items-center gap-4 text-white">
                    <span className="text-emerald-400">✓</span>
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: The Registration Form[cite: 1] */}
          <div className="flex-1 flex flex-col justify-center px-12 md:px-20 relative overflow-y-auto">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-emerald-950">Create Account</h2>
              <p className="text-gray-500 mt-2">Begin your path to financial wellness.</p>
            </div>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-emerald-950 ml-1 text-sm uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Alex Johnson"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-950 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-emerald-950 ml-1 text-sm uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-950 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-emerald-950 ml-1 text-sm uppercase tracking-wider">Create Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-950 transition-all"
                />
              </div>

              <button className='mt-4 bg-emerald-950 text-white py-4 font-bold rounded-2xl hover:bg-emerald-950/90 active:bg-emerald-950/80 transition-all shadow-lg shadow-emerald-950/10 cursor-pointer'>
                Create Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 ">
                Already have an account? <Link to="/signin" className="text-emerald-950 font-bold hover:underline">Sign In</Link>
              </p>
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}

export default SignUp