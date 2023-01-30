import ReactLivePreview from '@/components/LivePreview/ReactLivePreview';
import SellerNavigation from '@/components/sellerDashboard/Navigation/SellerNavigation'
import React, { useState } from 'react'




function index() {


    const [data,setData] = useState({
        title:"",
        description:"",
        code:"",
    });

    const handleSubmit = ()=>{

    }
    const handleFormData = (key, value) => {
        setData({ ...data, [key]: value });
      };
  return (
    <SellerNavigation>
        <div className="flex justify-center items-center w-full h-full ">
      <div className="w-2/3 mt-26 flex-col w-full items-center justify-center ">
            <div className="mt-4">
              <label className="block text-gray-700">Any Title</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Title"
                minlength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800
                  focus:bg-white focus:outline-none"
                required
                value={data.siteName}
                onChange={(e) => handleFormData("siteName", e.target.value)}
              />
            </div>
    
            <div className="mt-4">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                 Description
              </label>
              <textarea
                id="details"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-cyan-800 focus:outline-none "
                placeholder="Write your Description here..."
                onChange={(e) => handleFormData("siteDescription", e.target.value)}
              ></textarea>
              <ReactLivePreview></ReactLivePreview>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full block bg-cyan-800 shadow-lg hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
              >
                Contribute
              </button>
            </div>
          </div>
          </div>
    </SellerNavigation>
  )
}

export default index