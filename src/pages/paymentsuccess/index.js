import alert from '@/Services/Alert';
import templateServices from '@/Services/TemplateServices';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BsFillCloudArrowDownFill} from 'react-icons/bs';
function PaymentSuccess() {
  const router = useRouter();

  const [site,setSite] = useState();
  const {siteId} = router.query;
  useEffect(()=>{
    const calls =  ()=>{
      try{
       
      
       if(siteId){
        templateServices.getTemplateById(siteId).then(response => {
        setSite(response);
       }).catch(err => {
        alert.showErrorAlert(err.message);
       })}
      }catch(err) {
        console.log(err);
      }
    }
    calls();
  },[siteId])
    
   const handleDownload = ()=>{
      const url = site.siteSourceCode;
      console.log(url);
      window.open(url.split("d/")[0] +"d/fl_attachment/" +url.split("d/")[1]);
    }
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center ">
        <div className='w-64'>
        <Image src="/images/verified.png" width={50} />
        </div>
        <p className="text-gray-700 text-xl text-bold my-4">The Payment is done successfully </p>
        <div onClick={handleDownload} className="flex my-4 flex-row w-96 items-center justify-between px-12 py-6 rounded-lg shadow-xl text-white bg-cyan-900 cursor-pointer hover:bg-cyan-700">
            <p>Click here to download the source code</p>
            <BsFillCloudArrowDownFill className="text-4xl font-bold text-white"/>
            </div>
        <button onClick={()=>{router.push("/")}} className="px-8 py-2 text-white bg-cyan-800 hover:bg-cyan-700 rounded-lg shadow-xl">
            Go Back to Home 
        </button>

    </div>
  )
}

export default PaymentSuccess