import React from "react";
import { RiFileCopyFill } from "react-icons/ri";
import { SiJavascript } from "react-icons/si";
import { AiFillEye } from "react-icons/ai";
import JsxParser from "react-jsx-parser";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

function ReactLivePreview({pCode,setCode}) {
  const [copySuccess, setCopySuccess] = React.useState("");
  const [currentCode, setCurrentCode] = React.useState(
    pCode
  );
  const copyToClipBoard = async () => {};

  return (
    <div className=" mt-4 flex flex-col justify-left w-full">
      <div class="w-full float-left">
        <div className="inline-flex px-2 py-1 bg-blue-100 items-center border-2 rounded-lg border-blue-400 ">
          <h2 className="text-blue-500">Live Preview</h2>
          <AiFillEye className="text-blue-500 ml-2 text-lg"></AiFillEye>
        </div>
      </div>

      <LiveProvider code={pCode}  onChange={(e) =>{console.log(e.target.value);}}>
        <div className=" w-full my-2 flex flex-col">
          <div className="border-2 border-cyan-800 p-2 rounded-xl h-32 ">
            <LivePreview />
          </div>
          <div className="bg-blue-100 border-blue-300 border-2 rounded shadow-xl p-2 mb-2 float-right">
            <SiJavascript className="mx-2 shadow-lg text-blue-700 border-2 rounded border-blue-400 text-2xl float-left cursor-pointer hover:text-blue-500" />
            <RiFileCopyFill
              className="mx-2 text-blue-700 border-2 rounded border-blue-400 text-2xl float-right cursor-pointer hover:text-blue-500"
              onClick={copyToClipBoard}
            />
          </div>
        </div>
        <div className="border-2 w-full border-cyan-800 p-2 rounded-xl min-h-32 bg-gray-800 ">
        <LiveEditor id="editor" onChange={(code=>setCode(code))}/>
        </div>
        <LiveError />
      </LiveProvider>
    </div>
  );
}

export default ReactLivePreview;
