import ReactLivePreview from '@/components/LivePreview/ReactLivePreview';
import SellerNavigation from '@/components/sellerDashboard/Navigation/SellerNavigation'
import alert from '@/Services/Alert';
import authServices from '@/Services/AuthServices';
import contributionServices from '@/Services/Contribution';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ClimbingBoxLoader } from 'react-spinners';




function index() {

  const router = useRouter();
  const [loading,setLoading] = useState(false);

  const [code,setCode]= useState();
    const [data,setData] = useState({
        title:"",
        description:"",
        code:"",
    });

    const handleSubmit = ()=>{
      setLoading(true);
      console.log(code);
      const newObject = {
        code:code,
        title:data.title,
        description:data.description
      }
      console.log(newObject);
       contributionServices.addContribution(authServices.getLoggedInUser()._id,newObject).then(response=>{
           alert.showSuccessAlert("Your Contribution is added");
           setLoading(false);
           router.push("/dashboard/viewcontributions");
       }).catch(error=>{
        alert.showErrorAlert("There is some Error"+error.message);
        setLoading(false);
       })
    }
    const handleFormData = (key, value) => {
        setData({ ...data, [key]: value });
      };
  return (
    <SellerNavigation>
        <div className="flex justify-center items-center w-full h-full ">
          {!loading?
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
                value={data.title}
                onChange={(e) => handleFormData("title", e.target.value)}
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
                value={data.description}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-cyan-800 focus:outline-none "
                placeholder="Write your Description here..."
                onChange={(e) => handleFormData("description", e.target.value)}
              ></textarea>
              <ReactLivePreview setCode = {setCode} pCode={code}></ReactLivePreview>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full block bg-cyan-800 shadow-lg hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
              >
                Contribute
              </button>
            </div>
          </div>:<ClimbingBoxLoader size={20} color="#005974"/>}
          </div>
    </SellerNavigation>
  )
}

export default index