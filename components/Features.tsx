import React from 'react'
import { FaClockRotateLeft, FaCalendarCheck } from 'react-icons/fa6'
import { TbAutomation } from "react-icons/tb";
import { CgSmartphoneChip } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
import { LuBot, LuHandshake } from "react-icons/lu";
import { AiOutlineSafety } from "react-icons/ai";




const Features = () => {
  return (
    <div className='mt-[700px] mx-[150px] gap-12 flex flex-col mb-10'>
        <div className='text-start flex flex-col gap-6'>
            <p className='text-blue-500 font-semibold text-lg'>Key Features</p>
            <h1 className='text-5xl font-semibold gap-5 flex-col flex'>
                <span>Close More Deals. Work Fewer Hours.</span><span>Let AI Do the Busywork.</span>
            </h1>
        </div>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-4'>
                <div className='w-[290px] h-[240px] bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-3 pb-3 pt-5 flex flex-col'>
                    <FaClockRotateLeft className='text-blue-500 text-5xl ml-3 mb-6 mt-4'/>
                    <h1 className='text-gray-800 font-semibold text-xl text-center'>Instant Lead Responses</h1>
                    <p className='text-gray-500 font-semibold text-md pl-[11px] mt-2'>Replies to new leads in seconds — 24/7.</p>
                </div>
                <div className='w-[290px] h-[240px] bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-3 pb-3 pt-5 flex flex-col'>
                    <TbAutomation className='text-blue-500 text-5xl ml-3 mb-6 mt-4'/>
                    <h1 className='text-gray-800 font-semibold text-xl text-center'>Auto Listing Descriptions</h1>
                    <p className='text-gray-500 font-semibold text-md pl-[8px] mt-2'>Generates high-converting property descriptions in one click.</p>
                </div>
                <div className='w-[290px] h-[240px] bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-3 pb-3 pt-5 flex flex-col'>
                    <CgSmartphoneChip className='text-blue-500 text-5xl ml-3 mb-6 mt-4'/>
                    <h1 className='text-gray-800 font-semibold text-xl pl-[10px]'>Smart Follow-Ups</h1>
                    <p className='text-gray-500 font-semibold text-md pl-[11px] mt-2'>Sends timely, personalized follow-ups automatically.</p>
                </div>
                <div className='w-[290px] h-[240px] bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-3 pb-3 pt-5 flex flex-col'>
                    <MdOutlineMail className='text-blue-500 text-5xl ml-3 mb-6 mt-4'/>
                    <h1 className='text-gray-800 font-semibold text-xl pl-[10px]'>Unified Inbox</h1>
                    <p className='text-gray-500 font-semibold text-md pl-[11px] mt-2'>Manage all chats, emails, and texts in one place.</p>
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <div className='w-[290px] h-[240px] bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-3 pb-3 pt-5 flex flex-col'>
                    <FaCalendarCheck className='text-blue-500 text-5xl ml-3 mb-6 mt-4'/>
                    <h1 className='text-gray-800 font-semibold text-xl pl-[10px]'>Automatic Scheduling</h1>
                    <p className='text-gray-500 font-semibold text-md pl-[11px] mt-2'>Books showings and meetings without the back-and-forth.</p>
                </div>
                <div className='w-[290px] h-[240px] bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-3 pb-3 pt-5 flex flex-col'>
                    <LuBot className='text-blue-500 text-5xl ml-3 mb-6 mt-4'/>
                    <h1 className='text-gray-800 font-semibold text-xl pl-[10px]'>AI Chat Widget</h1>
                    <p className='text-gray-500 font-semibold text-md pl-[11px] mt-2'>Captures and qualifies website leads around the clock.</p>
                </div>
                <div className='w-[290px] h-[240px] bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-3 pb-3 pt-5 flex flex-col'>
                    <LuHandshake className='text-blue-500 text-5xl ml-3 mb-6 mt-4'/>
                    <h1 className='text-gray-800 font-semibold text-xl pl-[10px]'>No Setup Needed</h1>
                    <p className='text-gray-500 font-semibold text-md pl-[11px] mt-2'>Ready to use out of the box — no training required.</p>
                </div>
                <div className='w-[290px] h-[240px] bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-3 pb-3 pt-5 flex flex-col'>
                    <AiOutlineSafety className='text-blue-500 text-5xl ml-3 mb-6 mt-4'/>
                    <h1 className='text-gray-800 font-semibold text-xl pl-[10px]'>Built for Compliance</h1>
                    <p className='text-gray-500 font-semibold text-md pl-[11px] mt-2'>Privacy-safe and aligned with real estate regulations.</p>
                </div>
            </div>
        </div>     
    </div>
  )
}

export default Features