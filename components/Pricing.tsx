import React from 'react'
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";


const Pricing = () => {
  return (
    <div id='pricing' className='flex flex-col items-center mt-[100px]'>
        <div className='text-center flex flex-col gap-3'>
            <p className='text-blue-500 font-semibold'>It&apos;s Your Choice</p>
            <h1 className='text-gray-700 text-6xl font-semibold'>Two Directions</h1>
            <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-6xl font-semibold'>One Decision</h1>
        </div>
        <div className='mt-10 brightness-0'>
            <img src="/arrows.webp"/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-4'>
            <div className='bg-gray-100 rounded-3xl p-8 md:p-10 shadow-xl flex flex-col h-auto w-[550px]'>
                <div className='text-center mb-8'>
                    <div className="inline-flex justify-center items-center bg-red-100 text-red-700 border border-red-300 text-sm font-semibold py-1 px-4 rounded-full mb-6">
                        ROAD ONE
                    </div>
                    <h3 className="text-3xl md:text-4xl text-primary-foreground font-bold mb-4">
                        The Way of 
                        <span className='text-red-600'> 99% </span>
                        of Realtors
                    </h3>
                    <div className='flex items-center justify-center gap-1 mb-3'>
                            <FaDollarSign className='text-4xl md:text-4xl text-red-600'/>
                            <span className='text-4xl md:text-5xl font-extrabold text-red-600'>10,000</span>
                            <span className='text-2xl font-bold text-red-600'>+</span>
                    </div>
                    <p className='text-gray-700 md:text-lg mb-6'>For a generic, underperforming AI Agent</p>
                    <div className='bg-white rounded-2xl p-6 mb-8 flex-grow shadow-lg border-2 border-gray-300'>
                        <h4 className='font-semibold text-gray-800 mb-4 flex items-start'>
                            An agency that delivers:
                        </h4>
                        <ul className='space-y-4 font-medium'>
                            <li className='flex items-start gap-3'>
                                <FaCircleXmark className='text-red-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-700'>Contact forms but no real conversations</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleXmark className='text-red-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-700'>Template listings you still have to rewrite</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleXmark className='text-red-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-700'>Plugin overload and constant bugs</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleXmark className='text-red-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-700'>Freelancer code held together with duct tape</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleXmark className='text-red-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-700'>Poor AI to help — just another headache</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleXmark className='text-red-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-700'>A giant bill and no ROI</span>
                            </li>
                        </ul>
                    </div>
                    <a className='mt-auto' href=''>
                        <button className='w-full border-2 border-gray-300 bg-white text-gray-700 font-medium py-3.5 rounded-xl hover:bg-gray-100 transition-all group shadow-lg border-b-4'>
                            <span className='inline-flex items-center'>Remain Generic</span>
                            <span className='inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity'>😑</span>
                        </button>
                    </a>
                </div>
            </div>
            <div className='bg-gray-700 rounded-3xl p-8 md:p-10 shadow-xl flex flex-col h-auto w-[550px]'>
                <div className='text-center mb-8'>    
                    <div className="inline-flex justify-center items-center bg-green-100 border border-green-300 text-sm font-semibold py-1 px-4 rounded-full mb-6">
                        <span className='text-green-600'>ROAD TWO</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl text-primary-foreground font-bold mb-[35px] text-gray-50">
                        The <br/>
                        Roofline AI Way
                    </h3>
                    <div className='flex items-center justify-center gap-1 mb-3 text-gray-50 font-medium text-xl'>
                        Fair, Performance-Based Pricing
                    </div>
                    <p className='text-gray-50 md:text-xl mb-6 font-medium'>For a next-gen, specialised AI Agent</p>
                    <div className='bg-transparent rounded-2xl p-6 mb-8 flex-grow shadow-lg shadow-gray-600 border-2 border-gray-300'>
                        <h4 className='font-semibold text-gray-50 mb-4 flex items-start'>
                            What we are known for:
                        </h4>
                        <ul className='space-y-4 font-medium'>
                            <li className='flex items-start gap-3'>
                                <FaCircleCheck className='text-green-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-50'>Leads replied to instantly — even at 2am</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleCheck className='text-green-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-50'>AI-powered neighborhood summaries</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleCheck className='text-green-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-50'>No more chasing leads</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleCheck className='text-green-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-50'>Everything built for real estate</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleCheck className='text-green-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-50'>Listings written for you</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <FaCircleCheck className='text-green-500 text-lg mt-0.5 flex-shrink-0'/>
                                <span className='text-gray-50'>A system that gets smarter the more you use it</span>
                            </li>
                        </ul>
                    </div>
                    <a className='mt-auto' href=''>
                        <button className='w-full border-2 border-green-300 bg-green-100 text-green-600 font-semibold py-3.5 rounded-xl hover:bg-green-300 transition-all group shadow-lg shadow-green-700 border-b-4 flex flex-row justify-center items-center'>
                            <span className='inline-flex items-center'>Get Started</span>
                            <span className='inline-block ml-2 group-hover:rotate-45 transition-all'><GoArrowUpRight/></span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pricing