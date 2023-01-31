import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import authServices from "../../../Services/AuthServices";
import alert from "../../../Services/Alert";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useRouter } from 'next/router'


function Login() {
  
  const navigate  = useRouter();
  //states
  const [loading, setLoading] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [data,setData]  = useState({
    email: "",
    password: ""
  }); 


  //google Authentication
  async function handleGoogleLogin() {
    signIn("google", { callbackUrl: process.env.CLIENT_URL });
  }
  //github authentication
  async function handleGithubLogin() {
    signIn("github", { callbackUrl: process.env.CLIENT_URL });
  }


  //validations
  const emailValidation = (email) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };
  const passwordValidation = (pass) => {
    if (pass.length < 8) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };


  //login authentication
  const login = (e) => {
    e.preventDefault();
    console.log(data)
    if (
      data.email === "" ||
      data.password === "" ||
      isValidEmail === true ||
      isValidPassword === true
    ) {
      alert.showErrorAlert("All details are required!");
      return;
    } else {
      setLoading(true);
      authServices
        .login(data)
        .then((data) => {
          setLoading(false);
          alert.showSuccessAlert("Successfully Logged in!");
          navigate.push("/");
        })
        .catch((err) => {
          alert.showErrorAlert("User is invalid" + err);
          setLoading(false);
        });
    }
  };


  //datahandler
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }

  return (
    <div className="flex flex-col min-h-screen py-2 justify-center">
      <main className="flex flex-col items-center w-full justify-center flex-1 sm:px-20 text-center">
       {!loading?
        <div className="flex flex-col shadow-lg rounded-xl w-full max-w-4xl sm:flex-row xl:w-2/3">
          <div className="w-full p-5 text-left sm:w-3/5">
            <div className="text-gray-700 text-left text-md flex flex-row items-center">
              <h1 className="text-cyan-800 font-bold mr-1 text-lg">Kinetic</h1>
              <p className="text-cyan-900 font-bold mr-1 text-lg">Glass</p>
            </div>
            <h1 className="text-center text-cyan-800 text-3xl font-bold">
              Sign In
            </h1>
            <form className="mt-6 px-16">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name=""
                  id=""
                  onChange={(e) => {
                    handleData("email", e.target.value);
                    emailValidation(e.target.value)
                  }}
                  value={data.email}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                />
                 {isValidEmail?<p className="text-red-500 text-sm">Please Provide a correct Email</p>:
              <></>}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  value={data.password}
                  placeholder="Enter Password"
                  onChange={(e) => {
                    handleData("password", e.target.value);
                    passwordValidation(e.target.value);
                  }}
                  minlength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800
                  focus:bg-white focus:outline-none"
                  required
                />
                 {isValidPassword?<p className="text-red-500 text-sm">Password must be at least 8 digits</p>:
              <></>}
              </div>

              <div className="text-right mt-2">
                <a
                  type="button"
                  onClick={()=>navigate.push("/auth/ForgotPassword")}
                  className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-cyan-700 focus:text-cyan-800"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                onClick={(e)=>login(e)}
                className="w-full block bg-cyan-800 shadow-lg hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className=" mt-4 shadow-xl w-full block bg-white hover:bg-cyan-800 hover:text-white focus:bg-cyan-900 focus:text-white transition duration-150 ease-in-out text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
              >
                <div className="flex items-center justify-center">
                  <FcGoogle></FcGoogle>
                  <span className="ml-4">Continue with Google</span>
                </div>
              </button>
              <button
                type="button"
                onClick={handleGithubLogin}
                className=" mt-4 shadow-xl w-full block bg-white hover:bg-cyan-800 hover:text-white focus:bg-cyan-900 focus:text-white transition duration-150 ease-in-out text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
              >
                <div className="flex items-center justify-center">
                  <FaGithub></FaGithub>
                  <span className="ml-4">Continue with Github</span>
                </div>
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              &copy; 2021 Kinetic Glass - All Rights Reserved.
            </p>
          </div>
          <div className="w-full bg-cyan-800 text-white rounded-tr-xl rounded-br-xl py-36 px-12 sm:w-2/5">
            <h1 className="text-4xl text-white ">Kinetic Glass</h1>
            <div className="border-2 inline-block color-white w-10 mb-2"></div>
            <p className="text-white mb-2">
              Sign up for getting free react templates<br></br>
              Stay with us!
            </p>
            <button onClick={()=>navigate.push("/auth/signup")} className="border-2 rounded-2xl px-12 py-2 font-bold color-white mt-6 hover:bg-white hover:text-cyan-800 transition duration-300 ease-in-out">
              Sign up
            </button>
          </div>
        </div>:<ClimbingBoxLoader color="#0d66a1" size={20}/>}
      </main>
    </div>
  );
}

export default Login;
