import React, { useState } from 'react'
import { AiFillShopping } from 'react-icons/ai'
import Head from 'next/head'
import Script from 'next/script';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const myaccount = ({ cart, total, clearCart, user }) => {
   
  const [checkout, setCheckout] = useState({
    name: "",
    pincode: "",
    state: "",
    phone: "",
    address: "",
    city: "",
    email: "",
  })

  const router = useRouter()
  
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
     const a=myuser.Extuser
     
    if (!myuser|| a) {//user.value
      router.push('/')
    }
    fetchdata()
  }, [])
  
  
  const fetchdata = async () => {
  const myuser = JSON.parse(localStorage.getItem('myuser'))
    const data = { token: myuser.token }
     
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnres = await a.json()

    setCheckout({
      name: txnres.name,
      pincode: txnres.pincode,
      state: txnres.state,
      phone: txnres.phone,
      address: txnres.address,
      city: txnres.city,

    })


  }

  const handleChange = async (e) => {
    setCheckout({
      ...checkout,
      [e.target.name]: e.target.value,

    });


  };

  const userdetails = async () => {
    const data = { token: user.value, checkout }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnres1 = await a.json()
    if (txnres1.sucess) {
      toast.info('Updated', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  const passwordUpdate = async () => {
    const data = { token: user.value, password: checkout.password, cpassword: checkout.cpassword, opassword: checkout.opassword }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnres1 = await a.json()
    if (txnres1.sucess) {
      toast.info('Password Updated', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error('Password Unmatched', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center pt-[70vw] md:pt-[5vw]">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <ToastContainer />
          <Head>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
          </Head>
          <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous" />
          <h2 className="font-semibold text-xl text-gray-600">My Account</h2>
          <p className="text-gray-500 mb-6"><AiFillShopping />  </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label for="full_name">Full Name</label>
                    <input type="text" name="name" value={checkout.name} onChange={handleChange} id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />

                  </div>

                  <div className="md:col-span-5">
                    <label for="email">Email Address <span className='text-sm text-gray-500'>(can't be updated)</span> </label>

                    {user.value ? <input type="text" name="email" value={[checkout.email] = user.email} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" readOnly /> : <input type="text" name="email" value={checkout.email} onChange={handleChange} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />}
                  </div>

                  <div className="md:col-span-3">
                    <label for="address">Address / Street</label>
                    <input type="text" name="address" value={checkout.address} onChange={handleChange} id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                  </div>

                  <div className="md:col-span-2">
                    <label for="city">City</label>
                    <input type="text" name="city" value={checkout.city} onChange={handleChange} id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                  </div>

                  <div className="md:col-span-2">
                    <label for="phone">Mobile No.</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input name="phone" value={checkout.phone} onChange={handleChange} id="country" placeholder="10-digit" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />


                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label for="state">State / province</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input name="state" value={checkout.state} onChange={handleChange} id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />

                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label for="zipcode">Zipcode</label>
                    <input type="text" name="pincode" value={checkout.pincode} onChange={handleChange} id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="disabled:bg-blue-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={userdetails}>Update</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <hr className="h-1 my-4 bg-gray-200 border-0 dark:bg-gray-950 z-40" />
          
           
          <h1 className='text-3xl'>Reset Your Password</h1>
   <div className=' sm:flex flex-row md:flex justify-around items-center bg-white p-4 shadow-lg'>
            <div className='' >
              <label for="password">Original Password</label>
              <input type="password" name="opassword" value={checkout.opassword} onChange={handleChange} id="opassword" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
            </div>
            <div className='' >
              <label for="password">Password</label>
              <input type="password" name="password" value={checkout.password} onChange={handleChange} id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
            </div>
            <div className=" ">
              <label for="cpassword">Confirm Password</label>
              <input type="password" name="cpassword" value={checkout.cpassword} onChange={handleChange} id="cpassword" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
            </div>
            <button onClick={passwordUpdate} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded">Submit</button>
          </div>
         
        </div> 

      </div>
    </div>
  )
}


export default myaccount