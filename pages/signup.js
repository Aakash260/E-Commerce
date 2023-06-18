import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
const signup = () => {
  const [formData, setFormData] = useState({});
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
    }, [])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    let response = await res.json()
    setFormData({
      name: '',
      email: '',
      password: '',

    });
    if (response.success) {
      toast.info('Signed Up', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}`)
      }, 1000);

    } else {
      toast.error('This email already registerd!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  };

  return (

    <div className="antialiased bg-gradient-to-br from-gray-100 to-white">
      <div className="container px-6 mx-auto">
        <div
          className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
        >
          <div className="flex flex-col w-full">
            <div>

              <img className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800" src="https://botw-pd.s3.amazonaws.com/onlineshopping.png" alt="logo" />

            </div>
            <h1 className="text-5xl text-gray-800 font-bold">SignUp Area</h1>
            <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
              SignUp to experiance awsome response from us.
            </p>
          </div>
          <div className="sm:pt-[5vw]  md:w-[full] overflow-x-scroll lg:w-9/12 mx-auto  ">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                Sign Up
              </h2>
              <form onSubmit={handlesubmit} method='POST' className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label for="username" className="text-gray-500 mb-2"
                  >Email</label
                  >
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Please insert your email"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label for="username" className="text-gray-500 mb-2"
                  >Username</label
                  >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Please insert your username"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label for="password" className="text-gray-500 mb-2"
                  >Password</label
                  >
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-lg"
                  />
                </div>
                <div id="button" className="flex flex-col w-full my-5">
                  <button
                    type='submit'
                    className="w-full py-4 bg-gray-600 rounded-lg text-green-100"
                  >

                    <ToastContainer
                      position="top-right"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                    />

                    <div className="flex flex-row items-center justify-center">
                      <div className="mr-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          ></path>
                        </svg>
                      </div>
                      <div className="font-bold">Sign Up</div>
                    </div>
                  </button>
                  <div className="flex justify-evenly mt-5">

                    <a
                      href="/login"
                      className="w-full text-center font-medium text-gray-500"
                    >Already have account!</a
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signup