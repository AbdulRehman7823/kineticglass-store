import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";
import authServices from "../../../Services/AuthServices";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import alert from "../../../Services/Alert";

function Signup() {
  const { data: session } = useSession();
  const navigate = useRouter();
  //states
  const [loading, setLoading] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [askVerify, setAskVerify] = React.useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
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

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("accessToken") ? true : false);
  }, []);
  //datahandler
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      alert.showErrorAlert("All Details are Required");
    } else {
      setLoading(true);
      authServices
        .registerUser(data)
        .then((data) => {
          alert.showSuccessAlert("The user registered successfully!");
          setLoading(false);
          setError("");
          setMsg(data.message);
          if (data.message === "Please verify your Email") {
            setAskVerify(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (
            err.response &&
            err.response.status >= 400 &&
            err.response.status <= 500
          ) {
            setError(err.response.data.message);
            alert.showErrorAlert(err.response.data.message);
          }
          alert.showErrorAlert("Internal Server Error");
        });
    }
  };

  const AskVerification = () => {
    return (
      <main className="flex flex-col items-center w-full justify-center flex-1 sm:px-20 text-center">
        <div className="bg-green-400 p-12 flex justify-center items-center flex-col shadow-xl rounded-lg w-2/5">
          <h1 className="text-white text-2xl underline font-bold">
            Please Verify your Email
          </h1>
          <p className="text-white text-lg">
            We have sent you a verification line click on the link for
            verification.
          </p>
          <h1 className="text-white text-xl ">Get back to work!</h1>
        </div>
      </main>
    );
  };

  return (
    <div className="flex flex-col min-h-screen py-2 justify-center">
      {askVerify ? (
        <AskVerification />
      ) : (
        <main className="flex flex-col items-center w-full justify-center flex-1 sm:px-20 text-center">
          {session || isLoggedIn ? (
            navigate.push("/")
          ) : loading ? (
            <ClimbingBoxLoader color="#0d66a1" size={30} />
          ) : (
            <div className="flex flex-col shadow-lg rounded-xl w-full max-w-4xl sm:flex-row xl:w-2/3">
              <div className="w-full p-5 text-left sm:w-3/5">
                <div className="text-gray-700 text-left text-md flex flex-row items-center">
                  <h1 className="text-cyan-800 font-bold mr-1 text-lg">
                    Kinetic
                  </h1>
                  <p className="text-cyan-900 font-bold mr-1 text-lg">Glass</p>
                </div>
                <h1 className="text-center text-cyan-800 text-3xl font-bold">
                  Sign Up
                </h1>
                <form className="mt-6 px-16" onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name=""
                      id=""
                      onChange={(e) => {
                        handleData("email", e.target.value);
                        emailValidation(e.target.value);
                      }}
                      value={data.email}
                      placeholder="Enter Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800 focus:bg-white focus:outline-none"
                      autofocus
                      autocomplete
                      required
                    />
                    {isValidEmail ? (
                      <p className="text-red-500 text-sm">
                        Please Provide a correct Email
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="mt-2">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      name=""
                      id=""
                      placeholder="Enter Password"
                      onChange={(e) => {
                        handleData("password", e.target.value);
                        passwordValidation(e.target.value);
                      }}
                      value={data.password}
                      minlength="6"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800
                  focus:bg-white focus:outline-none"
                      required
                    />
                    {isValidPassword ? (
                      <p className="text-red-500 text-sm">
                        Password must be at least 8 digits
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  {error && (
                    <div className="bg-red-500 w-full p-2 text-white rounded-md my-2">
                      {error}
                    </div>
                  )}
                  {msg && (
                    <div className="bg-green-500 w-full p-2 text-white rounded-md my-2">
                      {msg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full block bg-cyan-800 shadow-xl hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                  >
                    Sign Up
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
                <p className="text-sm text-gray-500 mt-12">
                  &copy; 2023 Kinetic Glass - All Rights Reserved.
                </p>
              </div>
              <div className="w-full bg-cyan-800 text-white rounded-tr-xl rounded-br-xl py-36 px-12 sm:w-2/5">
                <h1 className="text-4xl text-white ">Kinetic Glass</h1>
                <div className="border-2 inline-block color-white w-10 mb-2"></div>
                <p className="text-white mb-2">
                  Sign up for getting free react templates<br></br>
                  Stay with us!
                </p>
                <button
                  onClick={() => {
                    navigate.push("/auth/login");
                  }}
                  className="border-2 rounded-2xl px-12 py-2 font-bold color-white mt-6 hover:bg-white hover:text-cyan-800 transition duration-300 ease-in-out"
                >
                  {" "}
                  Sign In
                </button>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default Signup;
