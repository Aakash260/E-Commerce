import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useState } from 'react';
const forget = () => {
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('myuser')) {
            router.push('/')
        }
       
    }, [])
   // console.log("🚀 ~ file: forget.js:7 ~ forget ~  router:",  router.query) bcz reset email aiga 
    
    
    const [Forgot, setForgot] = useState({
        email:'',
        password:'',
        cpassword:''
    })
    const handlechange = async (e) => {
        setForgot({
            ...Forgot,
            [e.target.name]: e.target.value,
        })
    }
        const sendemail = async () => {
            let data = {
               email:Forgot.email,
                sendMail: true
            }
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forget`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            let res = await a.json()
            if (res.success) {
                console.log("🚀 ~ file: forget.js:29 ~ email ~ success:",)
            } else {
                console.log("🚀 ~ file: forget.js:31 ~ email ~  ", "error")

            }
        }

    
    const resetpassword = async () => {
        if(Forgot.password==Forgot.cpassword){
          let data={
            email:Forgot.email,
            password:Forgot.password,
            sendMail:false
          } 
          
       
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forget`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
    
        let  res = await a.json()
        if(res.success){
          console.log("🚀 ~ file: forget.js:29 ~ resetpassword ~ success:password changed",  )
        }else{
          console.log("🚀 ~ file: forget.js:31 ~ resetpassword ~  ", "error")
    
        }
        }else{
            alert('Password not same')
        }
      }
    return (

        <div className="antialiased bg-gradient-to-br from-gray-100 to-white ">
            <div className="container px-6 mx-auto">
                <div
                    className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
                >
                    <div className="flex flex-col w-full  ">
                        <div>

                            <img className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800" src="https://botw-pd.s3.amazonaws.com/onlineshopping.png" alt="logo" />

                        </div>
                        <h1 className="text-5xl text-gray-800 font-bold">Lost Area</h1>
                        <p className="w-5/14 mx-auto md:mx-0 text-gray-500">
                            We never make customer lost.Stuff happens,enter your register email and reset password
                        </p>
                    </div>
                    <div className="w-full   md:w-[full] pt-[25vw] sm:pt-[5vw] lg:w-9/12 mx-auto  ">
                        <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl ">
                            <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                                Forgot Area
                            </h2>
                            {!router.query.token &&   <form action="" className="w-full">
                                <div id="input" className="flex flex-col w-full my-5">
                                    <label for="username" className="text-gray-500 mb-2"
                                    >Registered Email</label
                                    >
                                    <input
                                        type="email"
                                       name='email'
                                       value={Forgot.email}
                                       onChange={handlechange}
                                        placeholder="Please insert your registered email"
                                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-lg"
                                    
                                        />
                                </div>

                                <div id="button" className="flex flex-col w-full my-5">
                                    <button
                                        type="button"
                                        className="w-full py-4 bg-gray-600 rounded-lg text-green-100"
                                        onClick={sendemail}
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
                                            <div className="font-bold">Reset</div>
                                        </div>
                                    </button>
                                    <div className="flex justify-evenly mt-5">
                                        <a
                                            href="/login"
                                            className="w-full text-center font-medium text-gray-500"
                                        >Login!</a
                                        >
                                        <a
                                            href="/signup"
                                            className="w-full text-center font-medium text-gray-500"
                                        >SignUp!</a
                                        >
                                    </div>
                                </div>
                            </form>}
                            {router.query.token &&   <form action="" className="w-full">
                                 
                               
                                <div  className="flex flex-col w-full my-5">
                                    <label for="Password" className="text-gray-500 mb-2"
                                    >Password</label
                                    >
                                    <input
                                        type="password"
                                        name='password'
                                        value={Forgot.password}
                                        onChange={handlechange}
                                        placeholder="Please insert your registered email"
                                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-lg"
                                    />
                                </div>
                                <div id="cpassword" className="flex flex-col w-full my-5">
                                    <label for="cpassword" className="text-gray-500 mb-2"
                                    >Registered Email</label
                                    >
                                    <input
                                        type="password"
                                        name="cpassword"
                                        value={Forgot.cpassword}
                                        onChange={handlechange}
                                        placeholder="Please insert your registered email"
                                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-lg"
                                    />
                                </div>

                                <div id="button" className="flex flex-col w-full my-5">
                                    <button
                                        type="button"
                                        className="w-full py-4 bg-gray-600 rounded-lg text-green-100"
                                        onClick={resetpassword}
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
                                            <div className="font-bold">Reset</div>
                                        </div>
                                    </button>
                                    <div className="flex justify-evenly mt-5">
                                        <a
                                            href="/login"
                                            className="w-full text-center font-medium text-gray-500"
                                        >Login!</a
                                        >
                                        <a
                                            href="/signup"
                                            className="w-full text-center font-medium text-gray-500"
                                        >SignUp!</a
                                        >
                                    </div>
                                </div>
                            </form>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forget