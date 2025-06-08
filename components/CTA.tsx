import React from 'react'
import { FaArrowUp } from "react-icons/fa";

const CTA = () => {
  return (
    <div id='cta' className='mt-[140px] w-auto h-[400px] gap-[50px] bg-gray-700 flex flex-col'>
        <div className='flex flex-col gap-4 items-center mt-15'>
            <h1 className='text-gray-50 text-5xl font-semibold'>Ready to get started?</h1>
            <h1 className='text-gray-50 text-5xl font-semibold'>What can be said can be solved.</h1>
        </div>
        <a href='' className='flex flex-col items-center'>
            <button className='bg-gray-50 group rounded-xl border-2 border-b-[4px] border-gray-300 text-gray-700 font-semibold py-3 px-[34px] shadow-lg flex items-center justify-center'>
                <span className='flex flex-row gap-[10px] items-center justify-center'>Request a Call</span>
            </button>
        </a>
        <div className='text-gray-50 flex flex-row justify-between px-6 text-sm mt-10'>
            <p>2025 © Roofline AI, All rights reserved.</p>
            <a href='#home' className='flex flex-row gap-1 items-center'>Back to Top <span className='text-md'><FaArrowUp/></span></a>
        </div>
    </div>
  )
}

export default CTA
