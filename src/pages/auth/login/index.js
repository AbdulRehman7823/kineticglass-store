import React from 'react'

function Login() {
  return (
    <div className="flex flex-col min-h-screen py-2 justify-center">
    <main className="flex flex-col items-center w-full justify-center flex-1 sm:px-20 text-center">
    <div className="flex flex-col shadow-lg rounded-xl w-full max-w-4xl sm:flex-row xl:w-2/3">
        <div className='w-full p-5 text-left sm:w-3/5'>
     <div className="text-gray-700 text-left text-md flex flex-row items-center">
        <h1 className='text-cyan-800 font-bold mr-1 text-lg'>Kinetic</h1>
        <p className='text-cyan-900 font-bold mr-1 text-lg'>Glass</p>
        </div>
        <h1 className="text-center text-cyan-800 text-3xl font-bold">Sign In</h1>
        <form className="mt-6 px-16">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name=""
                id=""
                onChange={(e)=>{handleData("email", e.target.value)}}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                onChange={(e)=>{handleData("password", e.target.value)}}
                minlength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-cyan-800
                  focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-cyan-700 focus:text-cyan-800"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full block bg-cyan-800 shadow-lg hover:bg-cyan-700 transition duration-150 ease-in-out focus:bg-cyan-900 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            &copy; 2021 Kinetic Glass - All Rights Reserved.
          </p>
        </div>
        <div className='w-full bg-cyan-800 text-white rounded-tr-xl rounded-br-xl py-36 px-12 sm:w-2/5'>

            <h1 className='text-4xl text-white '>Kinetic Glass</h1>
            <div className='border-2 inline-block color-white w-10 mb-2'></div>
            <p className='text-white mb-2'>
                Sign up for getting free react templates<br></br>
                Stay with us! 
            </p>
            <button className='border-2 rounded-2xl px-12 py-2 font-bold color-white mt-6 hover:bg-white hover:text-cyan-800 transition duration-300 ease-in-out'> Sign up</button>
            
        </div>
    </div>
    </main>
    </div>
  )
}

export default Login