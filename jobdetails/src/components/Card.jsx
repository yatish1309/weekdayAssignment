import React from 'react'

const Card = ({jobDetails}) => {
  return (
    <div className='p-6 border border-solid border-gray-500 rounded shadow-2xl w-[300px] md:w-[30rem] flex flex-col gap-2'>
      <div className='flex justify-start gap-6'>
        <div className='flex items-center justify-center'>
          <img src={jobDetails?.logoUrl}/>
        </div>
        <div className='flex flex-col'>
          <span className='text-[#909396] text-xl font-medium'>{jobDetails?.companyName}</span>
          <span className='text-black text-base font-medium capitalize'>{jobDetails?.jobRole}</span>
          <span className='text-black text-small font-medium capitalize'>{jobDetails?.location}</span>
        </div>
      </div>
      <div>
      <div className='flex flex-col gap-2'>
        <span className='text-black text-base font-bold'>About-us:</span>
        <span>
          {jobDetails?.jobDetailsFromCompany}
        </span>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-[#909396] text-xl font-medium'>Minimun Experience:</span>
        <span>{jobDetails?.minExp? `${jobDetails.minExp} years` :'0 years'}</span>
      </div>
      <button className='bg-green-700 w-full px-10 py-4 cursor-pointer text-white'>Apply</button>
    </div>
  )
}

export default Card
