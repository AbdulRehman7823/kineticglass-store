import React, { useEffect, useState } from "react";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import alert from "@/Services/Alert";
import { ClockLoader } from "react-spinners";

const NetlifyDeployer = ({data,urlField,setUrlField}) => {
  const [siteName,setSiteName] = useState(data.siteName);
  const [buildFolder, setBuildFolder] = useState(null);
  const token = "0ZM-0XfbmXqf0iLPvQXAtAeXgscbX3ss8N5_U0I49sk";
  const [createLoading, setCreateLoading] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      const res = await axios.post(
        "https://api.netlify.com/api/v1/sites",
        {
          name: siteName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
     const siteId = res.data.id;
      data.siteId=siteId
      setCreateLoading(false);
      await deployBuild(siteId, buildFolder);
      await getSiteDetails(siteId);
      alert.showSuccessAlert("Build Successfully Deployed!");
    } catch (error) {
      console.error(error);
      setCreateLoading(false);
    }
  };

  const deployBuild = async (siteId, buildFolder) => {
    try {
      setDeployLoading(true);
      await axios
        .post(
          `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
          buildFolder,
          {
            headers: {
              "Content-Type": `application/zip`,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert.showErrorAlert(response);
        })
        .catch((err) => console.log(err));
      setDeployLoading(false);
    } catch (error) {
      console.error(error);
      setDeployLoading(false);
    }
  };

  const getSiteDetails = async (siteId) => {

    await axios.get(`https://api.netlify.com/api/v1/sites/${siteId}`,
    {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
    }).then(res=>{
      console.log(res)
      data.siteId = siteId;
      data.siteImage = res.data.screenshot_url;
      data.siteUrl = res.data.url;
      setUrlField(true);
      return res.data;
    }).then(resData=>{
      if(resData.screenshot_url!==null){
         data.siteUrl = resData.screenshot_url;
         return resData.screenshot_url;
      }else{
        return resData.screenshot_url;
      }
    }).then(screenshotUrl=>{
      console.log(screenshotUrl);
      data.siteUrl = screenshotUrl;
    })
    
    
    .catch(err=>{
      alert.showErrorAlert("There is some Error in your Zip folder");
      console.log(err);
    })
  }

  const handleFileSelect = (e) => {
    setBuildFolder(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <>
      {createLoading ? (
        <div className="w-full flex flex-col items-center justify-center mt-12">
          <h1 className="w-full text-xl text-center mb-4 text-gray-600 font-bold">
            We Are Creating your App
          </h1>
          <ClockLoader className="w-full" color="#36d7b7" size={100} />
        </div>
      ) : (
        <>
          {deployLoading ? (
            <div className="w-full flex flex-col items-center justify-center mt-12">
              <h1 className="w-full text-xl text-center mb-4 text-gray-600 font-bold">
                App Is Deploying Stay with us!
              </h1>
              <ClimbingBoxLoader color="#36d7b7" />
            </div>
          ) : (
            <div className="flex flex-col  w-full ">
              <label
                class="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                onChange={handleFileSelect}
              />

              {!urlField&&<button
                type="button"
                onClick={handleSubmit}
                className="w-2/5 block bg-cyan-800 shadow-lg  hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Deploy
              </button>}
            </div>
          )}
        </>
      )}
    </>
  );
};
export default NetlifyDeployer;
