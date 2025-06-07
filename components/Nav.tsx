import React from 'react'
import { TbHexagon3D } from "react-icons/tb";

const Nav = () => {
  return (
        <div className='w-auto h-[70px] my-[20px] relative py-[3px} flex flex-row justify-between items-center mx-[12px] bg-inherit'>
            <a className='text-2xl font-semibold text-gray-700 flex flex-row items-center gap-[4px] justify-center' href='#home'>
                <span className='text-5xl'><TbHexagon3D/></span>
                <span>roofline ai</span>
            </a>
            <div className='flex-row gap-8 font-semibold flex text-gray-700'>
                <a href='#features' className="group relative">
                    Features
                    <span className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full origin-center scale-x-0 transform bg-gray-700 transition-transform duration-300 group-hover:scale-x-100"></span>
                </a>
                <a href='#about' className="group relative">About<span className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full origin-center scale-x-0 transform bg-gray-700 transition-transform duration-300 group-hover:scale-x-100"></span></a>
                <a href='#pricing' className="group relative">Pricing<span className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full origin-center scale-x-0 transform bg-gray-700 transition-transform duration-300 group-hover:scale-x-100"></span></a>
                <a href='' className="group relative">FAQS<span className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full origin-center scale-x-0 transform bg-gray-700 transition-transform duration-300 group-hover:scale-x-100"></span></a>
                <a href='' className="group relative">Login<span className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full origin-center scale-x-0 transform bg-gray-700 transition-transform duration-300 group-hover:scale-x-100"></span></a>
            </div>
            <div>
                <button className='bg-blue-500 group rounded-xl border-b-[4px] border-blue-700 text-gray-50 font-semibold py-3 px-[34px]'>
                    <a href='' className='flex flex-row gap-[10px] items-center justify-center'>Try It Yourself</a>
                </button>
            </div>
        </div>
  )
}

export default Nav