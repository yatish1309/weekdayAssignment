'use client'
import React, { useEffect, useState } from 'react'
import { getJobDetails } from '../fetchdata/getJobDetails'
import DropDown from './DropDown'
import Search from './Search'
import Card from './Card'

const roleMenuItems = ['frontend', 'backend', 'ios', 'android', 'tech lead']
const locationMenuItems = ['delhi ncr', 'mumbai', 'chennai', 'bangalore', 'hyderabad', 'remote'];
const expMenuItems = ['0','1','2','3','4','5','6','7','8','9','>9'];

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState();
  const [offset, setOffset] = useState(0);
  const [filteredDetails, setFilteredDetails] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [location, setLocation]= useState();
  const [minExp, setMinExp] = useState();
  const [salary,setSalary] = useState();
  const [company,setCompany] = useState();
  useEffect(() => {
    fetchJobDetails();
  }, [])
  const fetchJobDetails = async () => {
    const details = await getJobDetails(offset);
    if (details) {
      console.log('!@#$% details',details);
      setJobDetails([...details.jdList ]);
      if(!filteredDetails){
        setFilteredDetails([...details.jdList ]);
      }
      setOffset((val) => val + 10);
    } else {
      setJobDetails({});
    }
  }
  console.log('!@#$ job', jobDetails)
  const handleRoleValue = (event) => {
    setSelectedRole(event.target.value);
  }
  const handleLocationValue = (event)=>{
    setLocation(event.target.value);
  }
  const handleExpValue = (event)=>{
    setMinExp(event.target.value);
  }
  const handleSalaryValue = (event)=>{
    setSalary(event.target.value);
  }
  const handleCompanyName = (event)=>{
    setCompany(event.target.value);
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap justify-center items-center gap-4'>
        <div className='w-[15rem]'>
          <DropDown
            inputName='Role'
            inputValue={selectedRole}
            menuItems={roleMenuItems}
            handleInputValue={handleRoleValue}
          />
        </div>
        <div className='w-[15rem]'>
        <DropDown 
          inputName='Location'
          inputValue={location}
          menuItems={locationMenuItems}
          handleInputValue={handleLocationValue}
        />
        </div>
        <div className='w-[15rem]'>
        <DropDown 
          inputName='Min Experience'
          inputValue={minExp}
          menuItems={expMenuItems}
          handleInputValue={handleExpValue}
        />
        </div>
        <Search
        placeholder={'Min Salary in '}
        inputValue={salary}
        handleInputValue={handleSalaryValue}
        />
        <Search
        placeholder={'Company Name'}
        inputValue={company}
        handleInputValue={handleCompanyName}
        />
      </div>
      <div className='flex flex-col gap-6 md:flex-row flex-wrap justify-center items-center'>
        {filteredDetails?.map((jobDetails,index)=>{
          return(
            <Card
            jobDetails={jobDetails}
            key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default JobDetails;
