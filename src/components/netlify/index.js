import React, { useState } from "react";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const NetlifyDeployer = () => {
  const [siteName, setSiteName] = useState("");
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
      setCreateLoading(false);
      await deployBuild(siteId, buildFolder);
      alert("Build Successfully Deployed!");
    } catch (error) {
      console.error(error);
      setCreateLoading(false);
    }
  };

  const deployBuild = async (siteId, buildFolder) => {
    try {
      setDeployLoading(true);
      const formData = new FormData();
      formData.append("folder", buildFolder);
      await axios
        .post(
          `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
          formData,
          {
            headers: {
              "Content-Type": "application/zip",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
      setDeployLoading(false);
    } catch (error) {
      console.error(error);
      setDeployLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    setBuildFolder(e.target.files[0]);
  };

  return (
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
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="w-2/5 block bg-cyan-800 shadow-lg  hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
      >
        Deploy
      </button>
    </div>
  );
};
export default NetlifyDeployer;
