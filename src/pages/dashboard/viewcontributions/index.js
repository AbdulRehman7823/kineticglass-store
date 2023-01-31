import ContributionList from '@/components/contributionList';
import SellerNavigation from '@/components/sellerDashboard/Navigation/SellerNavigation'
import alert from '@/Services/Alert';
import authServices from '@/Services/AuthServices'
import contributionServices from '@/Services/Contribution'
import React, { useEffect, useState } from 'react'
import { ClimbingBoxLoader } from 'react-spinners';

function ViewContributions() {
    const [loading,setLoading] = useState(false);

    const [contributions,setContributions] = useState([]);
    useEffect(()=>{
        setLoading(true);
       contributionServices.getAllUserContributions(authServices.getLoggedInUser()._id).then(result =>
        {
            setContributions(result);
            
        setLoading(false);
        }


        ).catch(err => {
            alert.showErrorAlert("There is some Error"+err.message);
            
        setLoading(false);
        }) 
    },[])
  return (
    <SellerNavigation>
        <div className="mt-24 flex flex-col justify-center items-center w-full">
            
            <h1 className="text-3xl text-cyan-800 font-bold">
                Your Contributions
            </h1>
            {loading?<ClimbingBoxLoader color='#005974' size={20}></ClimbingBoxLoader>:
        <ContributionList contributions={contributions}/>}
        </div>
    </SellerNavigation>
  )
}

export default ViewContributions