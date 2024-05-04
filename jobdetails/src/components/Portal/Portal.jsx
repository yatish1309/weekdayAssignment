'use client'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

const DELAY = 200;
const isServer = ()=>{
  if(typeof window !==undefined)return false;
  return true;
}
const useDelayUmount = (isMounted, delayTime) => {
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showDiv])
  return showDiv;
}
const PortalComp = ({ show, onClick, children }) => {
  const showDiv = useDelayUmount(show, DELAY);
  const portal = showDiv ? (
    <div onClick={onClick}
      className='w-full h-full bg-black fixed top-0 bg-opacity-70 flex justify-center items-center'
    >
        {children}
    </div>
  ) : null;
  if(isServer())return null;
  return createPortal(
    portal,
    document.getElementById('modal-root')
  );
}

export default PortalComp;
