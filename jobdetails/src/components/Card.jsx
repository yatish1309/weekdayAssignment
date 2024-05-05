'use client'
import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

//This portal is used for the popup/overlay
import PortalComp from './Portal/Portal'


const Card = ({ jobDetails }) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const router = useRouter();
  const descriptionRef = useRef(null);
  const handleApplyClick = () => {
    router.push(jobDetails?.jdLink)
  }
  const handlePortalClick = () => {
    setShowPortal(false);
  }
  useEffect(() => {
    if (descriptionRef.current) {
      if (descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    }
  }, [descriptionRef.current])

  const displayPortal = () => {
    setShowPortal(true);
  };
  return (
    <div className='p-6 border border-solid border-gray-500 rounded shadow-2xl w-[300px] md:w-[30rem] flex flex-col gap-2'>
      <div className='flex justify-start gap-6'>
        <div className='flex items-center justify-center'>
          <img src={jobDetails?.logoUrl} />
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
          <div ref={descriptionRef} className='relative job-description'>
            {jobDetails?.jobDetailsFromCompany}
          </div>
          <div className='flex justify-center items-center cursor-pointer' onClick={displayPortal}> Show More</div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-[#909396] text-xl font-medium'>Minimun Experience:</span>
        <span>{jobDetails?.minExp ? `${jobDetails.minExp} years` : '0 years'}</span>
      </div>
      <button className='bg-green-700 w-full px-10 py-4 cursor-pointer text-white' onClick={handleApplyClick}>Apply</button>
      <PortalComp
        show={showPortal}
        onClick={handlePortalClick}
      >
        <div className='bg-white w-3/4 p-4 flex flex-col gap-4 h-3/4 overflow-scroll' onClick={(e) => e.stopPropagation()}>
          <span className='text-black text-xl font-bold '>Job Description</span>
          <span className='text-black text-base font-medium'>
            {jobDetails?.jobDetailsFromCompany}
          </span>
        </div>
      </PortalComp>
    </div>
  )
}

export default Card
