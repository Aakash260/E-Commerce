import React,{useState}  from 'react'
import {AiFillShopping} from 'react-icons/ai'
import Head from 'next/head'
import Script from 'next/script';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pincodes from'../pincodes.json' 
const checkout = ({cart,total,clearCart,user }) => {
const [checkout, setCheckout] = useState({
name:"",
pincode:"",
state:"",
phone:"",
address:"",
city:"",
email:""
})

const [disabled, setDisabled] = useState(true)
 
 
const handleChange = async(e) => {
  
 setCheckout({
    ...checkout,
    [e.target.name]: e.target.value,
     
});
};
  
 
useEffect(() => {
 
  for (const key in checkout) {  
  if(`${checkout[key]}`.length===0){
    setDisabled(true)
    break
  }
    else{
    setDisabled(false)
   }
  }
  
}, [ checkout  ])
 useEffect(() => {
  fetchdata()
 }, [])
 const fetchdata = async () => {
  const myuser=JSON.parse(localStorage.getItem('myuser'))
  const data = { token:myuser.token}
 
  let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
 let txnres = await a.json()
 
    setCheckout({
      name:txnres.name,
      pincode:txnres.pincode,
      state:txnres.state,
      phone:txnres.phone,
      address:txnres.address,
      city:txnres.city

    })
  
}
  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now()); 
    //get token
    const data = { cart, total, oid, checkout,email:user.email };//hm ye bej rhe ha
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/preTrans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let txnres = await a.json()
      
 if(txnres.success){
    let txnToken = txnres.txnToken;//txnres me se txntoken nikl k do
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
   
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": total /* update amount */
      },
       
      "handler": {
        "notifyMerchant": function (eventName, data) {
          
        }
      }
    };

    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    
    }).catch(function onError(error) {
      // console.log("error => ", error);
       res.json({ error });
    });
  }else{
    clearCart()
    toast.error(txnres.error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
}
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center pt-[70vw] md:pt-[5vw]">
    <div className="container max-w-screen-lg mx-auto">
      <div>
      <ToastContainer/>
      <Head>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
      </Head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous" />
        <h2 className="font-semibold text-xl text-gray-600">Checkout Details</h2>
        <p className="text-gray-500 mb-6"><AiFillShopping  />  </p>
 
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
                  <input type="text" name="name" value={checkout.name} onChange={handleChange} id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   />
                </div>
  
                <div className="md:col-span-5">
                  <label for="email">Email Address</label>
                  
                 {user.value?<input type="text" name="email" value={[checkout.email]=user.email} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   placeholder="email@domain.com"  readOnly/>: <input type="text" name="email" value={checkout.email} onChange={handleChange} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   placeholder="email@domain.com" />} 
                </div>
  
                <div className="md:col-span-3">
                  <label for="address">Address / Street</label>
                  <input type="text" name="address" value={checkout.address} onChange={handleChange} id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   placeholder="" />
                </div>
  
                <div className="md:col-span-2">
                  <label for="city">City</label>
                  <input type="text" name="city" value={checkout.city} onChange={handleChange} id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   placeholder="" />
                </div>
  
                <div className="md:col-span-2">
                  <label for="phone">Mobile No.</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="phone" value={checkout.phone} onChange={handleChange} id="country" placeholder="10-digit" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"   />
                     
                     
                  </div>
                </div>
  
                <div className="md:col-span-2">
                  <label for="state">State / province</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="state" value={checkout.state} onChange={handleChange} id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"   />
                   
                  </div>
                </div>
  
                <div className="md:col-span-1">
                  <label for="zipcode">Zipcode</label>
                  <input type="text" name="pincode" value={checkout.pincode} onChange={handleChange} id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder=""   />
                </div>
  
                 
  
                 
        
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button disabled={disabled} onClick={initiatePayment} className="disabled:bg-blue-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
        <hr className="h-1 my-4 bg-gray-200 border-0 dark:bg-gray-950 z-40"/>
        <h1 className='text-3xl'>Review Your Cart</h1>
        <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200 mt-4">
   
        { Object.keys(cart).map((k) =>{return <div  key={k} >  <li className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={cart[k].img} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
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
                  <p className="mt-1 text-sm text-gray-500">size: {cart[k].size}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty: {cart[k].qty}</p>
                
                 
                </div>
                </div>
                </li>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-black-700 z-40"/>
                </div>   })} 
                {Object.keys(cart).length===0&&<div>Your Cart is Empty!</div>}
                {Object.keys(cart).length!=0&&  <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{total}</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Discount <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">STUDENT</span></p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">NULL</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Free</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">Rs:{total}</p>
                  </div>
                </div>
               
              </div>}
  
          </ul>
        </div>
      </div>
      </div>
      
      </div>
      </div>
  )
}
 

export default checkout