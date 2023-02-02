import alert from "@/Services/Alert";
import templateServices from "@/Services/TemplateServices";
import React, { useEffect, useState } from "react";
import CardList from "../cardlist";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function ShowCase() {

  const [templates,setTemplates] = useState([]);
  useEffect(()=>{

    templateServices.getAllTemplates().then(res=>{
           setTemplates(res);
    }).catch(err=>{
      alert.showErrorAlert(err.message);
    })
  },[]);


  
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };
  const handleOnSelect = (templates) => {
    setTemplates([templates]);
  };
  const handleClear = () => {
    setTemplates([]);
    getData();
  };
  const formatResult = (templates) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {templates.siteName}
        </span>
      </>
    );
  };

  const Search = () => {
    return (
      <div className="w-2/3">
      <ReactSearchAutocomplete
      items={templates}
      fuseOptions={{ keys: ["siteName"] }}
      resultStringKeyName="siteName"
      onSelect={handleOnSelect}
      onClear={handleClear}
      formatResult={formatResult}
      onSearch={handleOnSearch}
      styling={{ zIndex: 4 }}
      autoFocus
      placeholder="Search Templates"
    />
    </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-12">
      <Search></Search>
      <CardList templates={templates}/>
      <button className="px-12 py-4 text-white font-bold bg-cyan-800 rounded-lg shadow-xl hover:bg-cyan-700 ">Explore more</button>
      <hr className="w-96 h-1 my-8 bg-cyan-900 border-0 rounded dark:bg-gray-700"/>

    </div>
  );
}

export default ShowCase;
