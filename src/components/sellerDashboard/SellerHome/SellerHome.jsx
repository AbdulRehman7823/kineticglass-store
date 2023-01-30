import authServices from "@/Services/AuthServices";
import React, { useEffect, useState } from "react";
import TopCard from "../Cards/TopCard";
import {AiFillDollarCircle} from 'react-icons/ai';
import {HiTemplate} from "react-icons/hi";
import {GoIssueReopened} from "react-icons/go";
function SellerHome() {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(authServices.getLoggedInUser());
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-top items-center">
      <h1 className="text-gray-700 text-2xl items-center text-center my-8">
        Welcome Back {user.username}
      </h1>
      <div className="flex flex-row w-full flex-wrap justify-around">
        {/*Total sales card*/}

        <div class="max-w-sm w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <AiFillDollarCircle className="text-5xl text-cyan-700"></AiFillDollarCircle>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Total Sales
            </h5>
          </a>
          <h1 class="mb-3 font-bold text-2xl text-cyan-800 dark:text-gray-400">
            0$
          </h1>
          <button className="bg-cyan-800 text-white px-4 py-2 rounded-md shadow-xl float-right">
            View Transactions
          </button>
        </div>

        {/* */}
        
        <div class="max-w-sm w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            class="w-10 h-10 mb-2 text-green-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
              clip-rule="evenodd"
            ></path>
            <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Cleared Amount
            </h5>
          </a>
          <h1 class="mb-3 font-bold text-2xl text-cyan-800 dark:text-gray-400">
            0$
          </h1>
          <button className="bg-cyan-800 text-white px-4 py-2 rounded-md shadow-xl float-right">
            Withdraw
          </button>
        </div>
      </div>





      <div className="flex flex-row w-full flex-wrap justify-around mt-4">
        {/*Total sales card*/}

        <div class="max-w-sm w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
         <HiTemplate className="text-5xl text-cyan-700"></HiTemplate>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-700 dark:text-white">
              Total Templates
            </h5>
          </a>
          <p className="text-md text-gray-700">
            Uploading more Templates will increase your sales
          </p>
          <button className="bg-cyan-800 text-white px-4 py-2 rounded-md shadow-xl float-right">
            Add Template
          </button>
        </div>

        {/* */}
        
        <div class="max-w-sm w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
         <GoIssueReopened className="text-red-500 text-5xl"></GoIssueReopened>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Issues
            </h5>
          </a>
          <p className="text-md text-gray-700">
            Click here to check if someone has issue with your Provided Code
          </p>
          <button className="bg-cyan-800 text-white px-4 py-2 rounded-md shadow-xl float-right">
            View Issues
          </button>
        </div>
      </div>

    </div>
  );
}

export default SellerHome;
