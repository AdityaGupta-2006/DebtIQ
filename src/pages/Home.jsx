import React from 'react'
import { Link } from "react-router-dom"
import heroImage from "../assets/heroImage.png"
import bellAlert from "./../assets/svg/bellAlert.svg"
import warning from "./../assets/svg/warning.svg"

function Home() {
  return (
    <div className="overflow-x-hidden">
      <nav className='py-3 px-6 md:px-10 flex justify-between items-center'>
        <div className="flex items-center flex-1 md:flex-none">
          <h1 className="font-bebas text-3xl md:text-4xl tracking-wider text-gray-900 font-medium">
            Debt<span className="text-green-950">IQ</span>
          </h1>
        </div>

        <div className='hidden md:flex flex-1 justify-center my-auto'>
          <ul className='flex justify-center gap-7'>
            {["features", "insights", "pricing", "support"].map((item, index) => (
              index < 3 ? (
                <li key={item} className="group">
                  <a
                    href={`#${item}`}
                    className="relative inline-block transition-all duration-300 hover:-translate-y-1 hover:text-black capitalize"
                  >
                    {item}
                    <span className="absolute left-1/2 -bottom-1 h-[2px] w-full bg-black 
                    transform -translate-x-1/2 scale-x-0 origin-center 
                    transition-transform duration-300 
                    group-hover:scale-x-100"></span>
                  </a>
                </li>
              ) : (
                <li key={item} className="group">
                  <Link
                    to="/support"
                    className="relative inline-block transition-all duration-300 hover:-translate-y-1 hover:text-black capitalize"
                  >
                    {item}
                    <span className="absolute left-1/2 -bottom-1 h-[2px] w-full bg-black 
                    transform -translate-x-1/2 scale-x-0 origin-center 
                    transition-transform duration-300 
                    group-hover:scale-x-100"></span>
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>

        <div className='flex items-center gap-4 md:gap-10 whitespace-nowrap'>
          <p className="hidden sm:block"><Link to="/signin">Sign In</Link></p>
          <Link to="/signup">
            <button className='bg-emerald-950 text-white px-4 py-2 rounded-full hover:bg-emerald-950/90 active:bg-emerald-950/80 transition-all text-sm md:text-base'>
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <section className="bg-slate-200/50 px-6 md:px-16 pt-12 md:pt-24 pb-10">
        <div id="features" className='flex flex-col lg:flex-row items-center lg:items-stretch h-full gap-12 lg:gap-0'>
          <div className='flex-1 flex gap-6 md:gap-8 flex-col justify-center text-center lg:text-left items-center lg:items-start'>
            <span className='bg-green-700/25 px-3 py-2 rounded-full font-medium flex items-center gap-2 w-fit text-emerald-950 text-xs md:text-sm'>
              <img src='https://www.svgrepo.com/show/348529/verified.svg' className='h-4 md:h-5' />
              WELLNESS FOCUSED
            </span>

            <div>
              <p className='font-bold text-3xl md:text-5xl text-emerald-950 leading-tight'>Master Your Debt,</p>
              <p className='font-medium text-3xl md:text-5xl text-emerald-950 leading-tight'>Reclaim Your Freedom.</p>
            </div>

            <div className='text-lg md:text-xl text-gray-600 max-w-xl'>
              Navigate the path to financial clarity with a supportive partner. 
              Our AI-driven sanctuary helps you organize, strategize, and eliminate debt with quiet confidence.
            </div>

            <div className='flex flex-col sm:flex-row gap-4 md:gap-10 w-full sm:w-auto'>
              <button className='bg-emerald-950 text-white px-6 py-4 font-bold rounded-xl hover:bg-emerald-950/90 active:bg-emerald-950/80 transition-all cursor-pointer w-full sm:w-auto'>
                Start Your Journey
              </button>
              <button className='border border-gray-500 px-7 py-3 lg:py-0 rounded-3xl font-medium text-green-950 flex items-center justify-center gap-2 text-lg cursor-pointer transition-all w-full sm:w-auto'>
                <img src="https://www.svgrepo.com/show/379237/play-circle.svg" className='h-7'/>
                Watch Demo
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-stretch w-full">
            <div className="w-full aspect-square md:aspect-[4/3]">
              <img src={heroImage} className="h-full w-full object-cover rounded-3xl" />
            </div>
          </div>
        </div>

        <div id='insights' className='mt-24 md:mt-50 flex flex-col items-center gap-10'>
            <div className='flex flex-col items-center gap-5 text-center'>
              <p className='font-bold text-3xl md:text-5xl text-emerald-950 leading-tight'>A Sanctuary for Progress</p>
              <p className='text-lg md:text-xl text-gray-600 max-w-xl'>Simple tools designed to move you forward without noise.</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-6 md:gap-10 w-full'>
              <div className='flex-3 flex flex-col gap-2 rounded-3xl p-7 bg-white relative overflow-hidden min-h-[350px] md:min-h-0'>
                  <img src="https://www.svgrepo.com/show/521920/wallet.svg" className='h-8 w-8 z-10'/>
                  <p className='text-green-950 font-bold text-2xl z-10'>Smart Tracking</p>
                  <p className='w-full md:w-[50%] text-gray-500 z-10'>Connect your accounts in second. Real-time visiblity into all your loans, lines of credit, and balances in one beautiful, unified view.</p>
                  <div className='pt-6 pl-6 absolute bg-slate-200/50 z-0 right-0 bottom-0 h-[45%] md:h-[65%] w-[85%] md:w-[70%] rounded-tl-3xl flex flex-col gap-2'>
                    <div className='p-2 pr-1 bg-white flex justify-between rounded-l-2xl items-center'>
                      <div className='flex gap-2 md:gap-4 items-center'>
                        <div className='p-3 md:p-5 bg-gray-300/50 rounded-full'></div>
                        <div className='py-2 px-6 md:px-10 bg-gray-300/50 rounded-md'></div>
                      </div>
                      <div className='py-2 px-5 md:px-7 bg-green-700/30 rounded-md'></div>
                    </div>
                    <div className='p-2 pr-1 bg-white flex justify-between rounded-l-2xl items-center'>
                      <div className='flex gap-2 md:gap-4 items-center'>
                        <div className='p-3 md:p-5 bg-gray-300/50 rounded-full'></div>
                        <div className='py-2 px-6 md:px-10 bg-gray-300/50 rounded-md'></div>
                      </div>
                      <div className='py-2 px-5 md:px-7 bg-green-700/30 rounded-md'></div>
                    </div>
                  </div>
              </div>

              <div className='flex-1 flex flex-col gap-2 rounded-3xl p-7 bg-green-950/90'>
                  <img src="https://cdn-icons-png.flaticon.com/512/10728/10728412.png " className='h-8 w-8'/>
                  <p className='text-white font-bold text-2xl'>Optimized PayOff</p>
                  <p className='text-gray-400'>AI-driven strategies that identify the most interest heavy debt first, saving you thousands over your journey.</p>
                  <div className='relative w-full p-1 bg-gray-500 rounded-full mt-4'>
                    <div className='absolute w-[75%] p-1 bg-amber-700 rounded-full top-0 left-0'></div>
                  </div>
                  <p className='text-gray-400/70 text-xs'>75% Interest reduction target reached</p>
              </div>
            </div>

          <div className='flex flex-col md:flex-row rounded-2xl p-7 w-full bg-slate-300/50 gap-8'>
            <div className='flex-1 flex flex-col gap-2'>
              <img src={bellAlert} className='h-8 w-fit'/>
              <div className='text-green-950 text-2xl font-medium'>Predictive Alerts</div>
              <div className='text-gray-500 w-full md:w-[75%]'>
                Never miss a payment or opportunity. Smart urgency notifications guides you through cash flow dips and interset rate shifts before they happen.
              </div>
            </div>

            <div className='flex-1 flex justify-center md:justify-end items-center'>
              <div className='bg-white p-4 rounded-2xl flex flex-col sm:flex-row gap-4 w-full md:w-auto'>
                  <div className='bg-red-600/30 rounded-full py-3 px-1 flex items-center justify-center h-14 w-14 sm:h-auto sm:w-auto'>
                    <img src={warning} className='h-8'/>
                  </div>
                  <div>
                    <span className='font-medium text-green-950'>Impendeing Rate Change</span>
                    <div className='w-full md:w-75'>
                      <p className='text-gray-400 text-sm'>Your variable loan rate may rise next month. Consider a refinance now.</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='pricing' className='bg-green-950 p-6 md:p-12 text-white flex flex-col gap-10 justify-center'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <p className='text-3xl md:text-4xl font-bold'>Your Wellness Dashboard</p>
            <p className='text-sm text-gray-300'>A calm, centered view of your total financial landscape.</p>
          </div>
          <div className='flex flex-col lg:flex-row p-6 md:p-10 relative rounded-3xl overflow-hidden gap-10'>
            <div className='flex-3 flex flex-col gap-5'>
              <div className='flex flex-col sm:flex-row justify-around gap-4 md:gap-10'>
                <div className='flex-1 flex rounded-xl bg-black/20 p-4 border border-gray-700 flex-col gap-2 text-gray-400'>
                  <p>Total Debt</p>
                  <p className='text-white text-3xl md:text-4xl z-10'>$43,200</p>
                </div>
                <div className='flex-1 flex rounded-xl bg-black/20 p-4 border border-gray-700 flex-col gap-2 text-gray-400'>
                  <p>Monthly Saved</p>
                  <p className='text-amber-700 text-3xl md:text-4xl z-10'>$482</p>
                </div>
                <div className='flex-1 flex rounded-xl bg-black/20 p-4 border border-gray-700 flex-col gap-2 text-gray-400'>
                  <p>Health Score</p>
                  <p className='text-green-800 text-3xl md:text-4xl z-10'>84/100</p>
                </div>
              </div>
              <div className="flex items-end gap-2 md:gap-3 rounded-xl bg-black/20 p-4 border border-gray-700 w-full h-64 md:h-100">
                <div className="flex-1 bg-green-900 h-[30%] rounded-t-md"></div>
                <div className="flex-1 bg-green-800 h-[45%] rounded-t-md"></div>
                <div className="flex-1 bg-green-700 h-[60%] rounded-t-md"></div>
                <div className="flex-1 bg-green-600 h-[75%] rounded-t-md"></div>
                <div className="flex-1 bg-green-500 h-[90%] rounded-t-md"></div>
                <div className='absolute w-full h-full bg-white/50 left-0 top-0 z-5'></div>
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-5'>
              <p className='text-lg'>Priority Actions</p>
              {[
                { label: 'Car Loan', val: '$320', color: 'bg-amber-600', w: 'w-[90%]' },
                { label: 'Student Loan', val: '$12k', color: 'bg-emerald-300', w: 'w-[30%]' },
                { label: 'Chase Visa', val: '$4k', color: 'bg-teal-400', w: 'w-[50%]' }
              ].map((item, i) => (
                <div key={i} className='flex rounded-xl bg-black/20 p-4 border border-gray-700 flex-col gap-4'>
                  <div className='flex justify-between text-gray-400 w-full'>
                    <p>{item.label}</p>
                    <p>{item.val} Left</p>
                  </div>
                  <div className='bg-gray-600 p-1 rounded-full relative'>
                    <div className={`absolute p-1 ${item.color} left-0 top-0 rounded-full ${item.w} z-10`}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className='absolute w-full h-full bg-white/10 left-0 top-0 z-0 pointer-events-none'></div>
          </div>
      </section>

      <footer className="bg-slate-200/50 px-6 sm:px-16 py-12 border-t border-gray-300">
        <div className="flex flex-col sm:flex-row justify-between gap-10 items-center sm:items-start text-center sm:text-left">
          <div className="flex flex-col gap-3 items-center sm:items-start">
            <h1 className="font-bebas text-3xl tracking-wider text-gray-900">
              Debt<span className="text-green-950">IQ</span>
            </h1>
            <p className="text-gray-500 max-w-sm text-sm">
              A calm, intelligent way to manage debt and reclaim financial freedom.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-10 sm:gap-16 justify-center sm:justify-start text-center sm:text-left">
            <div className="flex flex-col gap-2 text-gray-600 items-center sm:items-start">
              <p className="font-semibold text-gray-900">Product</p>
              <a href="#features" className="hover:text-black transition">Features</a>
              <a href="#insights" className="hover:text-black transition">Insights</a>
              <a href="#pricing" className="hover:text-black transition">Pricing</a>
            </div>
            <div className="flex flex-col gap-2 text-gray-600 items-center sm:items-start">
              <p className="font-semibold text-gray-900">Company</p>
              <a href="#" className="hover:text-black transition">About</a>
              <a href="#" className="hover:text-black transition">Careers</a>
              <a href="#" className="hover:text-black transition">Contact</a>
            </div>
            <div className="flex flex-col gap-2 text-gray-600 items-center sm:items-start">
              <p className="font-semibold text-gray-900">Legal</p>
              <a href="#" className="hover:text-black transition">Privacy</a>
              <a href="#" className="hover:text-black transition">Terms</a>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center sm:items-start">
            <p className="text-gray-700 font-medium">Start your journey</p>
            <Link to="/dashboard">
              <button className="bg-emerald-950 text-white px-5 py-2 rounded-full hover:bg-emerald-950/90 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-300 pt-5 flex flex-col sm:flex-row justify-between items-center sm:items-start text-sm text-gray-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} DebtIQ. All rights reserved.</p>
          <div className="flex gap-5">
            <span className="hover:text-black cursor-pointer">Twitter</span>
            <span className="hover:text-black cursor-pointer">LinkedIn</span>
            <span className="hover:text-black cursor-pointer">GitHub</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home