import React from 'react'

const About = () => {
  return (
        <div className='flex flex-col items-center justify-center relative mt-[150px]'>
        <div className="relative isolate h-[1000px] bg-gray-50 overflow-hidden w-[1500px] flex flex-col items-center justify-center">
        {/* Background Grid */}
            <div className="absolute inset-0 grid grid-cols-12 opacity-50 pointer-events-none z-0">
                {Array.from({ length: 96 }).map((_, i) => (
                <div
                    key={i}
                    className="border border-gray-200 rounded-[10%] aspect-square"
                ></div>
                ))}
            </div>

        {/* Foreground Content */}
            <div className='flex flex-col relative z-20 bg-transparent gap-[65px]'>
                <div className="flex flex-col justify-center gap-[65px]">
                    <h1 className="text-5xl font-semibold text-gray-700 flex flex-col" >
                        <span className='flex flex-row gap-4 items-center'>Our goal <img src="/donut.webp" className='w-[80px] h-[80px]'/>is to build a world <img src="/world.webp" className='w-[80px] h-[80px]'/> <span className='text-gray-400'>where</span></span>
                        <span className='text-gray-400 flex flex-row gap-4 items-center'>technology <img src="/cube.webp" className='w-[80px] h-[80px]'/>serves humanity</span>
                    </h1>
                    <h1 className="text-5xl font-semibold text-gray-700 flex flex-col">
                        <span className='flex flex-row gap-4 items-center'>Our platform harnesses the power of AI<img src="/donut.webp" className='w-[80px] h-[80px]'/></span>
                        <span className='text-gray-400 flex flex-row gap-4 items-center'>to streamline processes <img src="/cube.webp" className='w-[80px] h-[80px]'/>and optimize</span>
                        <span className='flex flex-row gap-4 text-gray-400 items-center'>outcomes.<img src="/world.webp" className='w-[80px] h-[80px]'/></span>
                    </h1>
                </div>
                <div>
                <a href='#pricing'>    
                <button className='bg-blue-500 group rounded-xl border-b-[4px] border-blue-700 text-gray-50 font-semibold py-3 px-[34px]'>
                    <span className='flex flex-row gap-[10px] items-center justify-center group'>Try It Yourself</span>
                </button>
                </a>
                </div>
            </div>
            </div>
        </div>
  )
}

export default About