'use client'
import React, { useEffect, useState } from 'react'
import { getJobDetails } from '../fetchdata/getJobDetails'

const JobDetails = () => {
  const [jobDetails,setJobDetails]=useState();
  useEffect(()=>{
    fetchJobDetails();
  },[])
  const fetchJobDetails= async ()=>{
    const details=await getJobDetails();
    if(details){
      setJobDetails({...details});
    }else{
      setJobDetails({});
    }
  }
  return (
    <div>
      Hello
    </div>
  )
}

export default JobDetails;
