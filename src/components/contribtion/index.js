import React from "react";
import { RiFileCopyFill } from "react-icons/ri";
import { FcRefresh } from "react-icons/fc";
import { BsFileCodeFill } from "react-icons/bs";
import { SiJavascript } from "react-icons/si";
import { AiFillEye } from "react-icons/ai";
import JsxParser from "react-jsx-parser";


function Contribution(prop) {
  const { title, description,code } = prop;

  const [copySuccess, setCopySuccess] = React.useState("");
  const [currentCode, setCurrentCode] = React.useState(code);

  


  return (
    <div className="my-8 items-center p-4 rounded-lg flex flex-col shadow-xl bg-gray-200 w-full">
      <h1 className="text-3xl text-gray-700 font-bold w-full">
        {title}
      </h1>
      <br></br>
      <b className="w-full text-gray-700 font-medium">{description}</b>
      <br></br>
      <div class="w-full float-left">
        <div className="inline-flex px-2 py-1 bg-cyan-700 items-center border-2 rounded-lg border-cyan-800 ">
          <h2 className="text-white">Live Preview</h2>
          <AiFillEye className="text-white ml-2 text-lg"></AiFillEye>
        </div>
      </div>

      <div className="w-full bg-green-200 p-4 border-2 border-cyan-600 rounded-lg my-2">
        <JsxParser 
        jsx={currentCode} />
      </div>
      <div className=" w-full my-2 flex flex-col">
        <div className="bg-blue-100 border-blue-300 border-2 rounded shadow-xl p-2 mb-2 float-right">
          <SiJavascript className="mx-2 shadow-lg text-cyan-700 border-2 rounded border-blue-400 text-2xl float-left cursor-pointer hover:text-blue-500" />
          <RiFileCopyFill
            className="mx-2 text-cyan-700 border-2 rounded border-blue-400 text-2xl float-right cursor-pointer hover:text-blue-500"
          />
        </div>
        <textArea value={code} className="border-cyan-700 border-4 rounded p-4 " onChange={(e)=>{setCurrentCode(e.target.value)}}>
          {code}
        </textArea>
      </div>
      <hr className="my-4 border-2 w-2/3 text-cyan-900 border-cyan-900"/>

    </div>
  );
}

export default Contribution;
