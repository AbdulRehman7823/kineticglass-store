import React from "react";
import { useRouter } from "next/router";
import Box from "../animationBox";

function TopSection() {
    const navigate = useRouter();

  return (
    <>
      <div className="top-section-bg h-screen">
        <Box className="box" />
        <div className="main h-screen">
          <section className="text-gray-600 body-font mt-16">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-12">
                <div className="sm:text-5xl text-4xl font-bold title-font mb-4 text-gray-100 py-5 text-white">
                  Create Modern React apps with
                  <h1 className="text-cyan-600 sm:text-6xl text-4xl font-bold font-mono">
                    Kinetic Glass 
                  </h1>
                </div>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-lg text-white px-20">
                  Kinetic Glass is a simple, modular and accessible component
                  library that gives you the building blocks you need to build
                  your React applications.
                </p>
              </div>
              <div className="flex lg:w-2/3 justify-around items-center w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <button 
                 onClick={()=>navigate.push("/templates")}
                className="inline-flex items-center bg-cyan-900 hover:bg-cyan-800 shadow-xl text-white font-bold py-3 px-8 rounded text-xl">
                  <span>Get Started</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </button>
                <button 
                  onClick={()=>navigate.push("/dashboard/sellerhome")}
                 className="inline-flex items-center bg-white shadow-xl hover:bg-slate-300 text-gray-700 font-bold py-3 px-8 rounded text-xl">
                  <span>Earning</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
    
  );
}

export default TopSection;
