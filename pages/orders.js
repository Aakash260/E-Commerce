
 import Link from 'next/link'
 import { useRouter } from 'next/router'
 import { useEffect, useState } from 'react' 
const  orders = ({user} ) => {
  const router = useRouter()
 
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
     const a=myuser.Extuser
     
    if (!myuser) {//user.value
      router.push('/')
    }
    
  }, [])
  useEffect(() => {
 
      const fetchorders = async () => {
          let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorder`, {
              method: 'POST', // or 'PUT
              headers: {
                  'Content-Type': 'application/json',
              },
 
    body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token,Extuser: JSON.parse(localStorage.getItem('myuser')).Extuser,email:JSON.parse(localStorage.getItem('myuser')).email}), 
   
  })

  let res = await a.json()   
  console.log(res)
          setOrders(res.orders);
      }
      
          if (!localStorage.getItem('myuser')) {
              router.push('/')
          }
          else {
              fetchorders()
          }
}, [])
  
return (
      <div className=" pt-[65vw] md:pt-12  overflow-x-scroll">
      <div   >  
      <li className="flex pt-6">
             <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className=" flex justify-between text-base font-medium text-gray-900  ">
             
                    <h3>
                        <a href="#" className='ml-14 '>Details</a>
                      </h3>
                      <p className=" ml-6  ">Item Details</p>
                      <p className=" ml-6 ">Delivery</p>
                      <p className=" ml-6 mr-4 ">Payment Status</p>
                       
                    </div>
                    
                   
                  </div>
                  </div>
                  </li>
                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 z-40"/>
                  </div>    
      { orders.map((item)=>{return <div  key={item} >  <li className="flex py-6">
                
                
                 
                    <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                    
                    <h3>
                        <a href="#" className='ml-10'>Buyer:{item.name}</a>
                      </h3>
                     <Link href={'/order?id='+item._id}> <p className="   ml-6">...</p></Link>
                      <p className=" ml-6 ">{item.status==='INITIAL'?'Not Placed':'Placed'}</p>
                      <p className=" ml-6 mr-4">{item.status}</p>
                       
                    </div>
                    <div className='ml-10'>
                     
                    <p className="mt-1 text-sm text-gray-500">Order_id:{item.orderId}</p>           
                    <p className="mt-1 text-sm text-gray-500">Purchased on:{item.createdAt.slice(0,10)}</p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Amount: {item.amount}</p>
                    </div>
                    </div>
                  
                   
                  </div>
                  </div>
                  </li>
                
                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 z-40"/>
                  </div>   })} 
                  {orders.length===0&&<div>Your Cart is Empty!</div>}
                  </div>
                  )
   }
 

   export default orders