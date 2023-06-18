import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Order from '@/schema/order'
  import mongoose  from 'mongoose'
const Myorder = ({order,clearCart}) => {
  const router=useRouter()
  useEffect(() => {
    if(router.query.clearCart==1){
     clearCart()
    }
    
  }, [])
  
  
  const products=order.products
  
  return (
    <div>
    
    <section className="text-gray-600 body-font overflow-hidden">

    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">Product</h2>
        
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">OrderId:#{order.orderId}</h1>
          <h1 className="text-gray-900 text-xl title-font font-medium mb-4">OrderStatus:{order.status}</h1>
          <div className="flex mb-4">
            <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
            
          </div>
          <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p>
     
          {Object.keys(products).map((item)=>{
            return <div key={item}>
            <div className="flex border-t border-gray-200 py-2"> 
          <span className="text-gray-500">Product</span>
          <span className="ml-auto text-gray-900">{products[item].name}</span>
          </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Color</span>
            <span className="ml-auto text-gray-900">{products[item].variant}</span>
          </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Size</span>
            <span className="ml-auto text-gray-900">{products[item].size}</span>
          </div>
          <div className="flex border-t border-b mb-6 border-gray-200 py-2">
            <span className="text-gray-500">Quantity</span>
            <span className="ml-auto text-gray-900">{products[item].qty}</span>
          </div>
          <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500">SubTotal</span>
          <span className="ml-auto text-gray-900">₹{products[item].price}X{products[item].qty}=₹{products[item].price*products[item].qty}</span>
        </div>
          </div>
          })}

        
          <div className="flex border-t border-b mb-6 border-gray-200 py-2">
            <span className="text-gray-500">Total</span>
            <span className="ml-auto text-gray-900">₹{order.amount}</span>
          </div>
          <div className="flex">
            <span className="title-font font-medium text-2xl text-gray-900"></span>
            
            
            
          </div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://sridecor.com/wp-content/uploads/2019/02/Success-Place-Order-Complete-Shopping-Tick-512.png"/>
      </div>
    </div>
  </section>
   
    </div>
  )
}
export async function getServerSideProps(context) {
  const connectMongo = async () => mongoose.connect(process.env.MONGO_URI);
  try {
    await connectMongo();

    let order = await Order.findById(context.query.id)
     
    return {
      props: { order: JSON.parse(JSON.stringify(order))  }, // will be passed to the page component as props
    }
  }
  catch (error) {
    console.log(error);
    return {
      props: { error: JSON.parse(JSON.stringify(error)) },
    }
  }
}
export default Myorder