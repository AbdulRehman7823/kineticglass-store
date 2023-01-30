import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { MdDashboard, MdLibraryAdd, MdHelpCenter } from "react-icons/md";
import { FaHome,FaHandshake } from "react-icons/fa";
import {RiDeleteBin6Fill,RiLogoutBoxFill} from "react-icons/ri"
import {GiProgression} from "react-icons/gi"
import { useRouter } from 'next/router'



import SellerTopNavigation from "./SellerTopNavigation";
function SellerNavigation({ children }) {
  const [open, setOpen] = React.useState(true);
  const navigate = useRouter();


  const handler = (str) => {
    console.log(str);
  };

  const Menus = [
    {
      title: "Home",
      link: "/dashboard/sellerhome",
      icon: <FaHome />,
    },

    {
      title: "Add Component",
      link: "/dashboard/selleradd",
      icon: <MdLibraryAdd />,
    },
    {
      title: "Your Templates",
      link: "/dashboard/templates",
      icon: <RiDeleteBin6Fill />,
    },
    {
      title: "Delete Components",
      link: "/dashboard/sellerdelete",
      icon: <RiDeleteBin6Fill />,
    },
    
    {
        title: "Contribution",
        link: "/dashboard/sellercontribution",
        icon: <FaHandshake />,
        
      },
    {
      title: "Logout",
      link: "/",
      icon: <RiLogoutBoxFill />,
      spacing:true,

    },
    
  ];
  return (
    <div className="flex md:flex h-screen ">
      <div
        className={`scrollbar h-screen overflow-hidden overflow-x-hidden overflow-y-auto p-5 bg-white h-screen p-5 pt-8  ${
          open ? "w-96 duration-300" : "w-20 duration-300"
        } relative hidden md:block`}
      >
        <AiFillCaretLeft
          className={`text-gray-700 text-lg absolute right-1 top-3 cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <MdDashboard
            className={`bg-gray-100 text-4xl text-cyan-800 hover:text-cyan-900 rounded absolute cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-gray-700  origin-left ml-11 font-medium text-2xl ${
              !open && "scale-0 duration-400"
            }`}
          >
            Dashboard
          </h1>
        </div>

        <ul className="pt-12">
          {Menus.map((menu, index) => (
            <div key={index}>
              <li
                 onClick={() => {
                    navigate.push(menu.link);
                  }}
                key={index}
                className={`text-cyan-900 text-md flex items-center gap-x-4 cursor-pointer p-2 hover:shadow-lg duration-150 hover:bg-cyan-700 hover:text-gray-100 rounded-md  ${
                  menu.spacing ? "mt-44" : "mt-6"
                }`}
              >
                <span className="text-2xl block float-left ">
                  {menu.icon ? (
                    menu.icon
                  ) : (
                    <MdDashboard className=""></MdDashboard>
                  )}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-300 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="h-screen overflow-y-auto w-full bg-white">
        <SellerTopNavigation></SellerTopNavigation>
        {children}
        </div>
    </div>
  );
}

export default SellerNavigation;
