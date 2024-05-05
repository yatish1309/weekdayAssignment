'use client'

// This is the main file
import React, { useEffect, useRef, useState } from 'react'
import { getJobDetails } from '../fetchdata/getJobDetails'
import DropDown from './DropDown'
import Search from './Search'
import Card from './Card'
import Loader from './Loaders/Loader';

//Custom hook implemented for debouncing
import { useDebounce } from '../hooks/useDebounce'


const roleMenuItems = ['frontend', 'backend', 'ios', 'android', 'tech lead']
const locationMenuItems = ['delhi ncr', 'mumbai', 'chennai', 'bangalore', 'hyderabad', 'remote'];
const expMenuItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const [location, setLocation] = useState();
  const [minExp, setMinExp] = useState();
  const [salary, setSalary] = useState();
  const [company, setCompany] = useState();
  const [filter, setFilter] = useState(false);
  const lastElementRef = useRef(null);
  // Used debouncing for salary and company search
  const salaryDebounce = useDebounce(salary);
  const companyDebounce = useDebounce(company);

  const observerCallBack = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      //function used to fetch job details
      fetchJobDetails();
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallBack);
    if (observer && lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [jobDetails])


  useEffect(() => {
    if (filter || selectedRole || location || minExp || salaryDebounce || companyDebounce) {
      filterJobDetails();
    }
  }, [selectedRole, location, minExp, filter, salaryDebounce, companyDebounce,])

  //This function calls the api asynchronously
  const fetchJobDetails = async () => {
    const details = await getJobDetails(offset);
    if (details) {
      if (details.jdList.length === 0) {
        setHasMore(false);
      } else {
        setJobDetails((prev) => [...prev, ...details.jdList]);
        setOffset((val) => val + 10);
        setFilter(true);
      }
    } else {
      setJobDetails([]);
    }
  }

  // This function filters the job details based on the user entries on the UI

  const filterJobDetails = () => {
    const filtArray = jobDetails.filter((job) => {
      if (selectedRole && location && minExp) {
        return (job.jobRole === selectedRole && job.location === location && job.minExp >= Number(minExp));
      } else if (selectedRole && location) {
        return (job.jobRole === selectedRole && job.location === location);
      } else if (selectedRole && minExp) {
        return (job.jobRole === selectedRole && job.minExp >= Number(minExp));
      } else if (location && minExp) {
        return (job.location === location && job.minExp >= Number(minExp));
      } else if (selectedRole) {
        return (job.jobRole === selectedRole);
      } else if (location) {
        return (job.location === location);
      } else if (minExp) {
        return (job.minExp >= Number(minExp));
      }
      return true;
    });
    const filteredArray = filtArray.filter((job) => {
      if (salaryDebounce && companyDebounce) {
        return ((job.minJdSalary ? job.minJdSalary : 0) >= Number(salaryDebounce) && job.companyName.toLowerCase().includes(companyDebounce.toLowerCase()))
      } else if (salaryDebounce) {
        return (job.minJdSalary ? job.minJdSalary : 0) >= Number(salaryDebounce);
      } else if (companyDebounce) {
        return job.companyName.toLowerCase().includes(companyDebounce.toLowerCase());
      }
      return true;
    })

    setFilteredDetails([...filteredArray]);
    setFilter(false);
  }

  // Following functions are the handlers for the respective states

  const handleRoleValue = (event) => {
    setSelectedRole(event.target.value);
  }
  const handleLocationValue = (event) => {
    setLocation(event.target.value);
  }
  const handleExpValue = (event) => {
    setMinExp(event.target.value);
  }
  const handleSalaryValue = (event) => {
    setSalary(event.target.value);
  }
  const handleCompanyName = (event) => {
    setCompany(event.target.value);
  }
  return (
    <div>
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
            placeholder={'Min Salary in USD'}
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
          {filteredDetails?.map((jobDetails, index) => {
            return (
              <Card
                jobDetails={jobDetails}
                key={index}
              />
            )
          })}
        </div>
      </div>
      {hasMore && <div ref={lastElementRef} className='w-full flex justify-center'><Loader /></div>}
    </div>
  )
}

export default JobDetails;
