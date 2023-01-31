import React from "react";
import Contribution from "../contribtion";


function ContributionList({contributions,isSeller,isDelete}) {
  console.log(contributions);
  return (
    <div className="flex flex-col w-full items-center justify-between">
      {contributions.map((data,key)=>{
        return (
          <div className="w-2/3">
          <Contribution title={data.title} description={data.description} code={data.code}/>
          </div>
        )
      })}
    </div>
  );
}

export default ContributionList;
