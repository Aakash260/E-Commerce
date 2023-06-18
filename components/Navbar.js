"use client";
import React, { useEffect } from 'react'
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { BsFillCartFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
 
const Navbar = ({logout, addCart, removeCart, clearCart, cart, total,user }) => {
  const data=useSelector((state)=>{
    return state.userpic
  })
  
  const [picture, setpicture] = useState('')
  const router=useRouter
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
   
    if (myuser&&myuser.Extuser) {//user.value
  setpicture(myuser.pic) 
} else if(myuser&&!myuser.Extuser) {
  setpicture('') 
}
},)


  //states

  const notify = () => toast("Added To Cart");
  const notifyRemove = () => toast("Removed From Cart");
 const notifySignout= () => toast("Logout!"); 
 
  const [Menu, setMenu] = useState(false)
   const [drop, setDrop] = useState(false)
  // const [user, setuser] = useState({value:null})
  const toggleCart = () => {
    setDrop(!drop)
  }
  //toggelstates  
  const toggleMenu = () => {
    setMenu(!Menu)
  }
 
  return (
    <nav className="bg-gray-800 fixed w-[100vw] z-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
 
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>

            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
            <div className="flex flex-shrink-0 items-center">
              <img className="block h-8 w-auto lg:hidden" src="https://botw-pd.s3.amazonaws.com/onlineshopping.png" alt="Your Company" />
              <img className="hidden h-8 w-auto lg:block" src="https://botw-pd.s3.amazonaws.com/onlineshopping.png" alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">

                <Link  href="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-xl font-medium" aria-current="page">Theme Cloths </Link>
                <Link   href="/tshirts" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium text-xl">T-shirts </Link >
                <Link  href="/pants" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-medium">Pants</Link >
                <Link href="/shirts" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-medium">Shirts</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="sr-only">Cart</span>
              <BsFillCartFill onClick={toggleCart} className="h-6 w-6   " />
            </button>
            {drop && <div className='absolute z-20' aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity transform-transition ease-in-out duration-500 sm:duration-700"></div>
              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                    <div className="pointer-events-auto w-screen max-w-md ">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping Cart</h2>
                            <div className="ml-3 flex h-7 items-center">
                              <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Close panel</span>
                          <AiFillCloseCircle onClick={toggleCart} className="h-6 w-6" /> 
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">

                                {Object.keys(cart).map((k) => {
                                  return <div key={k} >  <li className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img src={cart[k].img} />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href="#">Name: {cart[k].name}</a>
                                          </h3>
                                          <p className="ml-4">Price: {cart[k].price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">color: {cart[k].variant}</p>
                                        <p className="mt-1 text-sm text-gray-500">color: {cart[k].size}</p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty: {cart[k].qty}</p>

                                        <div className="flex flex-col">
                                          <button onClick={() => { removeCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} type="button" className="font-medium text-gray-600 hover:text-gray-500  "> <a onClick={notifyRemove}>Remove</a>   </button>
                                          <button onClick={() => { addCart(k, 1, 2, 'Sunflower', 'L', 'Gray') }} type="button" className="font-medium text-gray-600 hover:text-gray-500"><a onClick={notify}>Add More</a> </button>
                                          <ToastContainer
                                            position="top-right"
                                            autoClose={200}
                                            hideProgressBar
                                            newestOnTop={false}
                                            closeOnClick={false}
                                            rtl={false}
                                            pauseOnFocusLoss={false}
                                            draggable
                                            pauseOnHover={false}
                                            theme="light"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 z-40" />
                                  </div>
                                })}
                                {Object.keys(cart).length === 0 && <div>Your Cart is Empty!</div>}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>Rs:{total}.0</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                          <div className="mt-6">
                            <a href="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700">Checkout</a>
                            <a href="#" onClick={clearCart} className="flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 mt-2">ClearCart</a>
                            
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
            <div className="relative ml-3">
              <div>
              
              {user&&user.value?<button onClick={toggleMenu} type="button" className="flex rounded-full bg-gray-800 text-sm hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">

                  <span className="sr-only">Open user menu</span>

          {!picture&& <CgProfile className="h-8 w-8 rounded-full" /> }   
                  
             {picture&& <img src={picture} className="h-8 w-8 rounded-full" alt="" srcset="" />}  
            
                </button>:<a href="/login" className="text-2xl font-bold"> Login</a> }
              
              </div>

              {Menu && <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">

              {!picture&&   <Link href="/myaccount" className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-300" role="menuitem" tabIndex="-1" id="user-menu-item-0">My Profile</Link>}
               
         <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-300" role="menuitem" tabIndex="-1" id="user-menu-item-1">My orders</Link> 
                <button  className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-300" role="menuitem" tabIndex="-1" id="user-menu-item-2"> <a onClick={logout}>Sign out</a>   </button>  
               
              </div >}
            </div>

          </div>

        </div>
      </div>


        <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">

          <a href="/" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Theme Cloths</a>
          <a href="/tshirts" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">T-shirts</a>
          <a href="/pants" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Pants</a>
          <a href="/shirts" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Shirts</a>
        </div>
      </div> 
    </nav>

  )
}

export default Navbar