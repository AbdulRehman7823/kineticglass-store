import SellerNavigation from "@/components/sellerDashboard/Navigation/SellerNavigation";
import alert from "@/Services/Alert";
import authServices from "@/Services/AuthServices";
import transactionServices from "@/Services/TransactionServices";
import React, { useEffect, useState } from "react";

function index() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    transactionServices
      .getAllTransactions(authServices.getLoggedInUser()._id)
      .then((res) => {
        setTransactions(res);
        console.log(res);
      })
      .catch((err) => {
        alert.showErrorAlert(err.message);
      });
  },[]);

  return (
    <SellerNavigation>
    <div className="w-full items-center flex flex-col mt-24 justify-center  ">
      <div class="w-2/3 items-center relative overflow-x-auto shadow-md sm:rounded-lg border-4 border-cyan-800">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Your Transactions
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              This table identifies your all transation, with date.
              <br></br>
              to make more sales upload more components and give a competitive
              price!!!
            </p>
          </caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Template Name
              </th>
              <th scope="col" class="px-6 py-3">
                Clear
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((data, key) => {
              return (
                <tr
                  key={key}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.name}
                  </th>
                  <td className="px-6 py-4">{data.cleared?"Cleared":"Pending"}</td>
                  <td className="px-6 py-4">{data.createdAt}</td>
                  <td className="px-6 py-4">{data.price}</td>
                  <td className="px-6 py-4 text-right"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </SellerNavigation>
  );
}

export default index;
