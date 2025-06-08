import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col items-center relative'>
    <div className="relative isolate h-[750px] bg-gray-50 overflow-hidden w-[1500px] flex flex-col items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-50 pointer-events-none z-0 ">
        {Array.from({ length: 72 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-[10%] aspect-square"
          ></div>
        ))}
      </div>

      {/* Foreground Content */}
      <div className='mt-[75px] flex flex-col items-center justify-center relative z-20 bg-gradient-to-b from-gray-50 via-gray-50/90 to-transparent'>
        <div className='bg-white py-2 px-4 rounded-xl shadow-2xl border-2 border-gray-200'>
          <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-semibold'>
            Next-Gen Automation
          </h1>
        </div>
        <div className="mt-[30px]">
           <h1 className="text-7xl font-medium text-gray-700 text-center flex flex-col gap-4">
            Real estate automation powered <br/>
            <span>
              by
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'> advanced AI</span>
            </span>
           </h1>
           <p className='text-gray-500 font-medium text-center mt-[25px] text-xl'>Save time, automate tasks, close deals.</p>
           <div className='flex flex-row justify-center items-center gap-4 mt-[50px]'>
            <a href='#pricing'>
              <button className='bg-blue-500 group rounded-xl border-b-[4px] border-blue-700 text-gray-50 font-semibold py-3 px-[34px]'>
                <span className='flex flex-row gap-[10px] items-center justify-center'>Try It Yourself</span>
              </button>
            </a>
            <a href='#cta'>
              <button className='bg-gray-50 group rounded-xl border-2 border-b-[4px] border-gray-300 text-gray-700 font-semibold py-3 px-[34px]'>
                <span className='flex flex-row gap-[10px] items-center justify-center'>Chat with Us</span>
              </button>
            </a>
           </div>
        </div>
      </div>
    </div>
     
    </div>
  )
}

export default Hero
