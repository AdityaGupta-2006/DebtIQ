import React from 'react'
import { Link } from "react-router-dom"
import heroImage from "../assets/heroImage.png"

function Home() {
  return (
    <div>
      <nav className='py-3 flex'>
        <div className="flex items-center justify-center flex-2 md:-ml-8">
          <h1 className="font-bebas text-4xl tracking-wider text-gray-900">
            Debt<span className="text-green-950">IQ</span>
          </h1>
        </div>

        <div className='flex-4 my-auto'>
          <ul className='flex justify-center gap-7'>

            {["features", "insights", "pricing", "support"].map((item) => (
              <li key={item} className="group">
                <a href={`#${item}`} className="relative inline-block transition-all duration-300 hover:-translate-y-1 hover:text-black capitalize">
                  {item}
                  <span className="absolute left-1/2 -bottom-1 h-[2px] w-full bg-black 
                  transform -translate-x-1/2 scale-x-0 origin-center 
                  transition-transform duration-300 
                  group-hover:scale-x-100"></span>
                </a>
              </li>
            ))}

          </ul>
        </div>

        <div className='flex-2 flex justify-center items-center gap-10 whitespace-nowrap'>
          <p><Link to="/signin">Sign In</Link></p>
          <Link to="/signup">
            <button className='bg-emerald-950 text-white px-4 py-2 rounded-full hover:bg-emerald-950/90 active:bg-emerald-950/80 transition-all'>
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <section className="bg-slate-200/50 px-16 pt-24 pb-10">
        <div className='flex items-stretch h-full'>
          
          <div className='flex-1 flex gap-8 flex-col justify-center'>
            <span className='bg-green-700/25 px-3 py-2 rounded-full font-medium flex items-center gap-2 w-fit text-emerald-950'>
              <img 
                src='https://www.svgrepo.com/show/348529/verified.svg' 
                className='h-5'
              />
              WELLNESS FOCUSED
            </span>

            <div>
              <p className='font-bold text-5xl text-emerald-950 leading-tight'>
                Master Your Debt,
              </p>
              <p className='font-medium text-5xl text-emerald-950 leading-tight'>
                Reclaim Your Freedom.
              </p>
            </div>

            <div className='text-xl text-gray-600 max-w-xl'>
              Navigate the path to financial clarity with a supportive partner. 
              Our AI-driven sanctuary helps you organize, strategize, and eliminate debt with quiet confidence.
            </div>

            <div>
              <button className='bg-emerald-950 text-white px-6 py-4 font-bold rounded-xl hover:bg-emerald-950/90 active:bg-emerald-950/80 transition-all'>
                Start Your Journey
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-stretch">
            <div className="w-full aspect-[4/3]">
              <img 
                src={heroImage} 
                className="h-full w-full object-cover rounded-3xl"
              />
            </div>
          </div>

        </div>
        

        <div className='mt-50 flex flex-col items-center gap-10'>
            <div className='flex flex-col items-center gap-5'>
              <p className='font-bold text-5xl text-emerald-950 leading-tight'>A Sanctuary for Progress</p>
              <p className='text-xl text-gray-600 max-w-xl'>
                Simple tools designed to move you forward without noise.
              </p>
            </div>

            <div className='flex gap-10 w-full'>

              <div className='flex-3 flex flex-col gap-2 rounded-3xl p-7 bg-white relative overflow-hidden'>
                  <img src="https://www.svgrepo.com/show/521920/wallet.svg" className='h-8 w-8 z-5'/>
                  <p className='text-green-950 font-bold text-2xl z-5'>Smart Tracking</p>
                  <p className='w-[50%] text-gray-500 z-5'>Connect your accounts in second. Real-time visiblity into all your loans, lines of credit, and balances in one beautiful, unified view.</p>
                  <div className='pt-6 pl-6 absolute bg-slate-200/50 z-4 right-0 bottom-0 h-[60%] w-[70%] rounded-tl-3xl'>
                    <div className='p-3 bg-white flex justify-between rounded-l-2xl'>
                      <div className='flex gap-2 items-stretch'>
                        <div className='p-5 bg-gray-300/50 rounded-full'></div>
                        <div className='p-2 py-1 rouded-md bg-gray-300/80'></div>
                      </div>
                      <div></div>
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


        </div>
        
      </section>
    </div>
  )
}

export default Home