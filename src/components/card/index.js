import alert from "@/Services/Alert";
import authServices from "@/Services/AuthServices";
import paymentServices from "@/Services/PaymentServices";
import templateServices from "@/Services/TemplateServices";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {ClipLoader} from 'react-spinners'
function Card({ data,isSeller,isDelete }) {
 
  const [loading,setLoading] = useState(false);

  const [rimage,setrImage] = useState("");
  const token = "0ZM-0XfbmXqf0iLPvQXAtAeXgscbX3ss8N5_U0I49sk";
  const router = useRouter();

  useEffect(()=>{
    const fetchData = async () => {
      console.log(data);
      try {
        if(data.siteId){
          if(data.siteImage==null || data.siteImage==""){

           await axios
            .get(`https://api.netlify.com/api/v1/sites/${data.siteId}`, {
              headers: {
                "Content-Type": `application/json`,
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              data.siteImage = res.data.screenshot_url;
              
              setrImage(res.data.screenshot_url);
            })
            .catch((err) => {
              console.log(err);
            });

            await templateServices.updateTemplate(id,{siteImage:rimage}).then(res=>{
              console.log(res);
            }).catch((err) => {
              alert.showErrorAlert(err.message);
            })
          }
        }
  
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  },[])

  const deleteHandler = ()=>{
     templateServices.deleteTemplate(data._id).then(response=>{
         alert.showSuccessAlert(response.message);
         router.push("/dashboard/templates");
     }).catch(error=>{
      alert.showErrorAlert("Error"+error.message);
     })
  }

  const purchase = ()=>{
    
    if(!authServices.getLoggedInUser()){
     router.push("/auth/login");
     return;
    }

    setLoading(true);
     const object = {
      senderId:authServices.getLoggedInUser()._id,
      receiverId:data.userId,
      price:data.sitePrice,
      name:data.siteName,
      siteId:data.siteId
     }
     paymentServices.doPayment(object).then(response => {
      console.log(response);
      setLoading(false);
      window.open(response.url);
     }).catch(err => {
      console.log(err);
      setLoading(false);
     });
  }

  return (
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 my-4 mx-2">
      <a href="#">
        <img
          class="rounded-t-lg"
          src={data.siteImage ? data.siteImage : "/images/tmp.jpg"}
          alt=""
        />
      </a>
      <div class="p-5">
        <a href={data.siteUrl}>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
            {data.siteName}
          </h5>
        </a>
        <h2 className="text-cyan-900 text-2xl font-bold">
          {data.sitePrice}$
        </h2>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.siteDescription}
        </p>

        <div className="flex flex-row justify-between ">
          <a
            href={data.siteUrl}
            target="_blank"
            className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-center text-white bg-cyan-800 rounded-md hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ringa-cyan-800"
          >
            Live Preview
            <svg
              aria-hidden="true"
              class="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          {isSeller?<></>:
          loading?<ClipLoader color="#36d7b7" />:
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-cyan-800 rounded-md hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ringa-cyan-800"
            onClick={authServices.getLoggedInUser() && data.userId===authServices.getLoggedInUser()._id?()=>{}:purchase}
          >
           {authServices.getLoggedInUser() && data.userId===authServices.getLoggedInUser()._id?"Your Template":"Purchase"}
          </button>}

          {isDelete && <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-cyan-800 rounded-md hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ringa-cyan-800"
            onClick={deleteHandler}
          >
            Delete
          </button>

          }
        </div>
      </div>
    </div>
  );
}

export default Card;
