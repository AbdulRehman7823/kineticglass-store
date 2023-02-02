import authServices from "@/Services/AuthServices";
import React from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";




export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [user , setUser] = React.useState();
  const {data:session} = useSession();
  const router = useRouter();
  React.useEffect(() => {
    console.log("2")
    setUser(authServices.getLoggedInUser());
  }, [session]);


  async function handleSighout() {
    session && signOut();
    authServices.logout();
    setUser(undefined);
    router.push("/")
  }
  return (
    <>
      <nav className="z-10 fixed top-0 w-full mt-0 flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-800 ">
        <div className="container px-2 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              Kinetic Store
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <BsFillMenuButtonWideFill className="text-white text-xl" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/templates"
                >
                  <span className="text-sm">Templates</span>
                </Link>
              </li>
              <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="/"
                  >
                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2 text-sm">Home</span>
                  </Link>
                </li>

              
              {!user && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="/auth/signup"
                  >
                    <span className="ml-2 text-sm">SignUp</span>
                  </Link>
                </li>
              )}

              {user ? (
                
                <li>
                  <div>
                    {user.img ? (
                      <img
                        class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                        src={user.img}
                        alt="Bordered avatar"
                      />
                    ) : (
                      <div class="ml-4 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-cyan-900 rounded-full dark:bg-gray-600">
                        <span class="font-medium text-white dark:text-gray-300">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
                
              ) : (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="/auth/login"
                  >
                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2 text-sm">SignIn</span>
                  </Link>
                </li>
              )}
             
            </ul>
          </div>
          
        </div>
        {user &&
               
               <button onClick={handleSighout} className="mx-4 bg-gray-100 text-black py-2 px-4 rounded-lg shadow-xl ">
                   Signout
               </button>
             }
      </nav>
    </>
  );
}
