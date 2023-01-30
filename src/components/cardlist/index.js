import React from "react";
import Card from "../card";

function CardList({templates,isSeller,isDelete}) {
  console.log(templates);
  return (
    <div className="flex flex-row flex-wrap w-full p-12 items-center justify-between">
      {templates.map((data,key)=>{
        return (
          <Card data={data} key={key} isSeller={isSeller} isDelete={isDelete}/>
        )
      })}
    </div>
  );
}

export default CardList;
