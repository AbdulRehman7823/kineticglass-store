import NetlifyDeployer from "../../netlify";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import FileUploader from "../../imageUploaders/FileUploader";
import convertImageToBase64 from "../../imageUploaders/ImageBase64";
import { uploadImage } from "../../imageUploaders/ImageUpload";
import alert from "../../../Services/Alert";
import axios from "axios";
import authServices from "@/Services/AuthServices";
import { useRouter } from "next/router";
import Image from "next/image";
function AddComponent() {
  const router = useRouter();
  const [description, setDescription] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deployment, setDeployment] = useState(false);
  const [deployHere, setDeployHere] = useState(false);
  const [urlField, setUrlField] = useState(false);
  const [deployUrlField, setDeployUrlField] = useState("");
  const [deployId, setDeployId] = useState("");

  const [imgUrl, setImgUrl] = React.useState();
  const [iurl, setIurl] = React.useState("");
  const [fileUrl, setFileUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [data, setData] = useState({
    siteId: "",
    siteName: "",
    siteDescription: "",
    sitePrice: 0,
    siteImage: "",
    siteUrl: "",
    siteSourceCode: "",
  });
  const handleFormData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  async function uploadFile(e) {
    setProgress(0);
    const file = e.target.files[0];
    await uploadImage(
      file,
      async (url, success) => {
        if (success) {
          setFileUrl(
            url.split("d/")[0] + "d/fl_attachment/" + url.split("d/")[1]
          );
          handleFormData("siteSourceCode", url);
        }
      },
      setProgress,
      true
    );
  }

  const MarkedSvg = () => {
    return (
      <span className="flex items-center justify-center w-10 h-10 bg-cyan-700 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-white lg:w-6 lg:h-6 dark:text-blue-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
    );
  };

  const handleDescription = (e) => {
    e.preventDefault();
    if (data.siteName === "" || data.siteDescription === "") {
      alert.showErrorAlert("All details are required");
      return;
    }
    setDescription(true);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (data.siteSourceCode === "" || data.siteImage === "") {
      alert.showErrorAlert("All details are required!");
    }
    setUploading(true);
    console.log(data);
  };

  const handleSubmit = (e) => {
    if (deployUrlField) {
      const newDataObject = {
        siteId: deployId,
        siteUrl: deployUrlField,
        siteName: data.siteName,
        siteImage: data.siteImage,
        siteSourceCode: data.siteSourceCode,
        sitePrice: data.sitePrice,
        siteDescription: data.siteDescription,
      };

      axios
        .post(
          `${process.env.SERVER_URL}/api/site/` +
            authServices.getLoggedInUser()._id,
          newDataObject
        )
        .then((res) => {
          alert.showSuccessAlert(res.data.message);
          router.push("/dashboard/selleradd");
        })
        .catch((err) => {
          alert.showErrorAlert(err.message);
        });
    } else {
      if (data.siteUrl !== "") {
        console.log(data);
        axios
          .post(
            `${process.env.SERVER_URL}/api/site/` +
              authServices.getLoggedInUser()._id,
            data
          )
          .then((res) => {
            alert.showSuccessAlert(res.data.message);
            router.push("/dashboard/selleradd");
          })
          .catch((err) => {
            alert.showErrorAlert(err.message);
          });
      } else {
        alert.showErrorAlert("Site url is required");
      }
    }
  };

  const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
    console.log(imgName);
    if (rejectedFiles.length > 0) {
      alert.showErrorAlert("Error!!! \n Description: Size Exceeded");
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              setIurl(url);
              handleFormData("siteImage", url);
              setImgUrl(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };

  return (
    <div className="flex flex-col justify-center w-full items-center h-2/3">
      <div className="w-2/3 items-center justify-center  mt-32">
        <ol className="flex flex-row items-center justify-center w-full">
          <li
            className={`flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b ${
              description ? "after:border-cyan-200" : "after:border-gray-100"
            } after:border-4 after:inline-block dark:after:border-blue-800`}
          >
            {description ? (
              <MarkedSvg></MarkedSvg>
            ) : (
              <span className="flex items-center justify-center w-10 h-10 bg-cyan-50 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                <MdDescription className="text-gray-500 text-2xl" />
              </span>
            )}
          </li>
          <li
            className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b ${
              uploading ? "after:border-cyan-200" : "after:border-gray-100"
            }  after:border-4 after:inline-block dark:after:border-gray-700`}
          >
            {uploading ? (
              <MarkedSvg></MarkedSvg>
            ) : (
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                <FaCloudUploadAlt className="text-gray-500 text-2xl" />
              </span>
            )}
          </li>
          <li className="flex items-center ">
            {deployment ? (
              <MarkedSvg></MarkedSvg>
            ) : (
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            )}
          </li>
        </ol>

        {!description ? (
          <div className="mt-26 flex-col w-full">
            <div className="mt-4">
              <label className="block text-gray-700">Your Site Name</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Your Site name"
                minlength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800
                  focus:bg-white focus:outline-none"
                required
                value={data.siteName}
                onChange={(e) => handleFormData("siteName", e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Your Site Price</label>
              <input
                type="number"
                name=""
                id=""
                placeholder="Enter Your Site Price in $"
                minlength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800
                  focus:bg-white focus:outline-none"
                required
                value={data.sitePrice}
                onChange={(e) => handleFormData("sitePrice", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Site Description
              </label>
              <textarea
                id="details"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-cyan-800 focus:outline-none "
                placeholder="Write your Site Description here..."
                value={data.siteDescription}
                onChange={(e) =>
                  handleFormData("siteDescription", e.target.value)
                }
              ></textarea>
              <button
                type="button"
                onClick={handleDescription}
                className="w-full block bg-cyan-800 shadow-lg hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}

        {description && !uploading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-row mt-12 justify-between">
              <div className="flex flex-col mr-6">
                <h1 className="text-gray-700 text-2xl font-bold">
                  Required Files
                </h1>
                <p className="text-gray-700 text-lg">
                  We need your whole source code for you Application{" "}
                </p>
                {/* source code upload */}
                <div className="flex items-center justify-center w-full mr-2 mt-4">
                  <label
                    for="dropzone-file"
                    className="px-6 py-2 flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Upload your Profile Image here!
                        </span>{" "}
                        or drag and drop
                      </p>
                    </div>
                    <input type="file" onChange={uploadFile}></input>

                    {progress > 0 && (
                      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                        <div
                          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                          style={{ width: progress + "%" }}
                        >
                          {progress}
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-around">
                <div className="flex items-center justify-center w-full h-full">
                  {iurl == "" ? (
                    <label
                      for="dropzone-file"
                      className="px-12 py-4 flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Upload your Profile Image here!
                          </span>{" "}
                          or drag and drop
                        </p>
                      </div>
                      <FileUploader
                        placeholder={imgUrl ? imgUrl : "Click here to upload"}
                        accept={["image/jpeg", "image/png", "image/bmp"]}
                        maxFiles={1}
                        maxSize={1000000}
                        onDrop={(acceptedFiles, rejectedFiles) =>
                          onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
                        }
                      />
                    </label>
                  ) : (
                    <img
                      className=" w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      src={iurl}
                      alt="no image"
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleUpload}
              className="w-2/5 block bg-cyan-800 shadow-lg  hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
            >
              Next
            </button>
          </div>
        ) : (
          <></>
        )}

        {description && uploading && !deployment ? (
          <div className="flex flex-col mt-12">
            <div className="items-left">
              <label className="relative inline-flex items-center mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={deployHere}
                  onChange={() => setDeployHere(!deployHere)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Deploye Here
                </span>
              </label>
            </div>
            {deployHere ? (
              <div className="flex flex-col">
                <h2 className="text-red-400 text-md">Not Recommended!</h2>
                <h1 className="text-cyan-800 text-xl">How to upload?</h1>
                <p className="text-gray-600 text-sm">
                  Go to your react or next project run command{" "}
                  <code className="bg-gray-600 text-white rounded-lg px-4 py-1">
                    {"npm build"}
                  </code>
                  . then you will get a build upload it here!
                </p>
                <NetlifyDeployer
                  name={data.siteName}
                  setUrlField={setUrlField}
                  urlField={urlField}
                  setDeployUrlField={setDeployUrlField}
                  setDeployId={setDeployId}
                />
              </div>
            ) : (
              <div>
                <h2 className="text-green-400 text-md">Recommended</h2>
                <h1 className="text-cyan-800 text-xl">How you can Deploy?</h1>
                <p className="text-gray-600 text-sm">
                  Go to
                  <a
                    className="text-cyan-400 underline mx-1"
                    href="https://vercel.com/"
                  >
                    vercel.com
                  </a>
                  or
                  <a
                    className="text-cyan-400 underline mx-1"
                    href="https://netlify.com/"
                  >
                    netify.com
                  </a>{" "}
                  and make you account there upload the build folder and they
                  will generate a URL paste it here!
                </p>
                <div className="mt-4">
                  <label className="block text-gray-700">
                    Your Deployed URL
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Your URL"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800
                  focus:bg-white focus:outline-none"
                    value={data.siteUrl}
                    onChange={(e) => handleFormData("siteUrl", e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            {!deployHere ? (
              <button
                type="button"
                onClick={handleSubmit}
                dataHandler={handleSubmit}
                className="w-2/5 block bg-cyan-800 shadow-lg  hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Submit
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {urlField && (
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="w-full block bg-cyan-800 shadow-lg  hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
          >
            You app is Ready Click here to Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default AddComponent;
