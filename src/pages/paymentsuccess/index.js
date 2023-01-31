import alert from '@/Services/Alert';
import templateServices from '@/Services/TemplateServices';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BsFillCloudArrowDownFill} from 'react-icons/bs';
function index() {

  const [site,setSite] = useState();

  useEffect(()=>{
    const calls = async ()=>{
       const {siteId} = router.query;
       await templateServices.getTemplateById(siteId).then(response => {
        setSite(response);
       }).catch(err => {
        alert.showErrorAlert(err.message);
       })
    }
    calls();
  },[])
    
   const handleDownload = ()=>{
      const url = site.siteSourceCode;
      console.log(url);
      window.open(url.split("d/")[0] +"d/fl_attachment/" +url.split("d/")[1]);
    }
const router = useRouter();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center mx-36 my-24">
        <img src="/images/verified.png" className='w-2/5'/>
        <p className="text-gray-700 text-xl my-4">The Payment is done success fully </p>
        <div onClick={handleDownload} className="flex flex-row w-36 items-center justify-between px-12 py-6 rounded-lg shadow-xl text-white bg-cyan-900 cursor-pointer">
            <p>Click here to download the source code</p>
            <BsFillCloudArrowDownFill className="text-2xl font-bold text-white"/>
            </div>
        <button onClick={()=>{router.push("/")}} className="px-8 py-2 text-white bg-cyan-800 hover:bg-cyan-700 rounded-lg shadow-xl">
            Go Back to Home 
        </button>

    </div>
  )
}

export default index