import { useRouter } from 'next/router';
import React from 'react'
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { addPic } from '@/Store/Slices/UserSlice';
const login= () => {

  const router = useRouter()
  const [first, setfirst] = useState('')
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });
  const dispact=useDispatch()
 
  useEffect(() => {
  if(localStorage.getItem('myuser')){
    router.push('/')
  }
}, [])
const addNPic=(payload) => {
 
  dispact(addPic(payload))
 
}
  const handleChange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data={email:loginData.email ,password:loginData.password}
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json() 
   
    if (response.success) {
      localStorage.setItem('myuser',JSON.stringify({token:response.token,email:response.email,Extuser:false}))
      toast.info('logged in', {
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
      }, 1000);//jb set time out pr code aiga to 1 sec bad chlega
  
    } else {
      toast.error('Wrong credential !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setloginData({
        email: '',
        password: '',
      });
    }
    
  };
 
  return (

    <div className="antialiased bg-gradient-to-br from-gray-100 to-white">
      <div className="container px-6 mx-auto">
        <div
          className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center  "
        >
        
          <div className="flex flex-col w-full">
          <div>
          
          <img className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800 " src="https://botw-pd.s3.amazonaws.com/onlineshopping.png" alt="logo" />
          
          </div>
          <h1 className="text-5xl text-gray-800 font-bold">Login Area</h1>
          <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
          Control and monitorize your cart through login
          </p>
          </div>
          
          <div className="w-full   md:w-[full] pt-[30vw] sm:pt-[10vw] lg:w-9/12 mx-auto  ">
          <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl ">
          <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
          Sign in
          </h2>
          <form onSubmit={handlesubmit} method='POST' className="w-full">
          <div id="input" className="flex flex-col w-full my-5">
                  <label for="email" className="text-gray-500 mb-2"
                  >Username</label
                  >
                  <input
                    type="email"
                     
                    value={loginData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Please insert your registered email"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label for="password" className="text-gray-500 mb-2"
                  >Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
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
                      
                      <div className="font-bold">Sign in</div>
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
                    </div>
                  </button>
                  <div className="flex justify-evenly mt-5">
                    <a
                      href="/forget"
                      className="w-full text-center font-medium text-gray-500"
                    >Recover password!</a
                    >
                    <a
                      href="/signup"
                      className="w-full text-center font-medium text-gray-500"
                    >Signup!</a
                    >
                    </div>
                    
                    </div>
                    </form>
                    <GoogleLogin
                     onSuccess={credentialResponse => {
                      const mytoken=jwt_decode(credentialResponse.credential).email 
                       const pic=jwt_decode(credentialResponse.credential).picture
                       addNPic(pic);
                      localStorage.setItem('myuser',JSON.stringify({token:credentialResponse.credential,email:mytoken,Extuser:true,pic:pic}))
                       toast.info('logged in', {
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
                     }}
                     onError={() => {
                       console.log('Login Failed');
                     }}
                   />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login