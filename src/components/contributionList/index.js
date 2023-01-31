import React from "react";
import Contribution from "../contribtion";


function ContributionList({contributions,isSeller,isDelete}) {
  return (
    <div className="flex flex-col w-full items-center justify-between">
      {contributions.map((data,key)=>{
        return (
          <div  key={key}  className="w-2/3">
          <Contribution key={key}   title={data.title} description={data.description} code={data.code}/>
          </div>
        )
      })}
    </div>
  );
}

export default ContributionList;
