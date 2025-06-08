import React from 'react'

const CTA = () => {
  return (
    <div id='cta' className='mt-[140px] w-auto h-[400px] gap-[50px] bg-gray-700 flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-gray-50 text-5xl font-semibold'>Ready to get started?</h1>
            <h1 className='text-gray-50 text-5xl font-semibold'>What can be said can be solved.</h1>
        </div>
        <a href=''>
            <button className='bg-gray-50 group rounded-xl border-2 border-b-[4px] border-gray-300 text-gray-700 font-semibold py-3 px-[34px] shadow-lg'>
                <span className='flex flex-row gap-[10px] items-center justify-center'>Request a Call</span>
            </button>
        </a>
    </div>
  )
}

export default CTA
