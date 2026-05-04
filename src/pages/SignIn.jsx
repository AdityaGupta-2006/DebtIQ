import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

function SignIn() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSignIn = (e) => {
    e.preventDefault(); 
    
  
    if (validateEmail(email) && password.length >= 6) {
      navigate("/dashboard");
    } else {
      alert("Please enter a valid email and a password with at least 6 characters.");
    }
  };

  return (
    <div className="h-screen w-full bg-white font-sans overflow-hidden flex flex-col">
      
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

      <main className="relative z-10 flex-1 flex items-center justify-center bg-slate-200/50 px-16 py-6 pb-20">
        
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_2px_2px,rgba(24,40,32,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>

        <div className="relative w-full max-w-4xl flex items-center justify-center">
          
          <div className="w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(24,40,32,0.05)] p-12 flex flex-col items-center">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-[#182820] mb-3">Welcome Back</h1>
              <p className="text-gray-500 max-w-[280px] mx-auto leading-relaxed">
                Continue your journey toward financial clarity and peace of mind.
              </p>
            </div>

            <form className="w-full space-y-6" onSubmit={handleSignIn}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#182820] ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-[#eaeef4] border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-950/10 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-[#182820]">Password</label>
                  <Link to="/forgot" className="text-xs font-bold text-[#182820] hover:underline">Forgot Password?</Link>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-[#eaeef4] border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-950/10 transition-all outline-none"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#182820] text-white py-5 rounded-full font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg mt-4 cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <div className="relative w-full my-8 flex items-center justify-center">
              <div className="absolute w-full border-t border-gray-200"></div>
              <span className="relative bg-white px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5" alt="Google" />
                <span className="font-bold text-sm">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="h-5" alt="Apple" />
                <span className="font-bold text-sm">Apple</span>
              </button>
            </div>

            <p className="mt-10 text-sm text-gray-500">
              Don't have an account? <Link to="/signup" className="text-[#182820] font-bold hover:underline ml-1">Sign Up</Link>
            </p>
          </div>

        </div>
      </main>

      <footer className="relative z-10 w-full px-16 py-10 bg-white border-t border-gray-100 flex justify-between items-center text-sm font-medium text-gray-500">
        <div className="flex gap-10">
          <div className="text-lg font-bold text-[#182820] mr-6">DebtIQ</div>
          <Link to="/privacy" className="hover:text-black">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-black">Terms of Service</Link>
          <Link to="/support" className="hover:text-black">Support</Link>
        </div>
        <div>© 2024 DebtIQ. Financial wellness for everyone.</div>
      </footer>

    </div>
  )
}

export default SignIn