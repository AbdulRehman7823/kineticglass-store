import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

function PaymentCancel() {
    
    const router = useRouter();
  return (
    <div className="h-scree w-full flex flex-col justify-center items-center ">
        <Image src="/images/failed.png" width="50%"/>
        <p className="text-gray-700 text-xl my-4">We are not able to proceed the payment </p>
        <button onClick={()=>{router.push("/")}} className="px-8 py-2 text-white bg-cyan-800 hover:bg-cyan-700 rounded-lg shadow-xl">
            Go Back to Home 
        </button>

    </div>
  )
}

export default PaymentCancel