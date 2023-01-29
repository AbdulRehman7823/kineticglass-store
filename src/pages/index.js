import {  useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import authServices from "../Services/AuthServices";
import React from "react";
import Navbar from "@/components/navbar";
import TopSection from "@/components/TopSection/TopSection";
import ShowCase from "@/components/showcase";
import { useRouter } from "next/router";
import { ClimbingBoxLoader } from "react-spinners";

export default function Home() {
  const { data: session } = useSession();
  const [loading,setLoading] = useState(false);


  const router = useRouter();
 

  useEffect( () => {
    
    if (session) {
      setLoading(true);
      authServices.thirdPartyRegister(session.user).then((res) => {
        setLoading(false);
      });
    }
  }, [session]);
  return (
    <div>
    {loading?
    <div className="w-full h-screen flex flex-col items-center justify-center">
     <ClimbingBoxLoader color="#005974" size={30}/>
     </div>
     :<div>
      <Navbar></Navbar>
      <TopSection></TopSection>
      <ShowCase></ShowCase>
      </div>
    }
    </div>
  );
}
