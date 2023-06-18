import { useRouter } from 'next/router';
import { useState,useEffect  } from 'react';
import connectMongo from '@/middleware/connectMongo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from '@/schema/product';
import Custom404 from '../404';
export default function Page({ BuyNow,addCart,product,variants,error }) {
  const router = useRouter();
   
    const refreshvariant = (newcolor, newsize) => {
      let url =`${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
       router.push(url)  
    } 

 
 
  const notify = () => toast("Added To Cart");
  const [pin, setPin] = useState()
  const [service, setservice] = useState()
  
  
  const { slug } = router.query

   const PinAvail = async ( ) => {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    const jsonData = await response.json()

    if (Object.keys(jsonData).includes(pin)) {
      setservice(true)
    } else {
      setservice(false)
    }
  }
 
  const onChangePin = (e) => {
    setPin(e.target.value)
  }
  const [color, setcolor] = useState() 
  const [size, setsize] = useState()
 
  useEffect(() => {
    if(!error){
      setcolor(product.color)
      setsize(product.size)
    }
  }, [router.query])
  if(error==404){
  return <Custom404 />
}
  return <div>
    <section className="text-gray-600 body-font overflow-hidden ">
      <div className="container px-5 py-24 mx-auto ">
        <div className="lg:w-4/5 mx-auto flex flex-wrap ">
      {product.availqty>0?<img alt="ecommerce" className="md:mt-auto lg:w-1/2 w-full mt-[25vh] lg:h-auto h-64 object-cover object-center rounded " src={product.img}/>:  
    
      <img alt="ecommerce" className="md:mt-auto lg:w-1/2 w-full mt-[25vh] lg:h-auto h-64 object-cover object-center rounded opacity-25" src={product.img}/>
     
    }
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0  ">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Theme Cloths</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium m-1">{product.title}</h1>

            <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
           <span className='font-bold'>Select Your Size and Grab color available:</span>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
            { Object.keys(variants).includes('white')  && Object.keys(variants['white']).includes(size) && <button onClick={()=>{refreshvariant('white',size)}} className={`border-4   bg-white rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? '  border-black' : 'border-gray-300'}`}></button>}
            { Object.keys(variants).includes('gray')  && Object.keys(variants['gray']).includes(size)&&   <button onClick={()=>{refreshvariant('gray',size)}} className={`border-4   ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none ${color === 'gray' ? 'border-black' : 'border-gray-300'}`}></button>}
            { Object.keys(variants).includes('blue')  && Object.keys(variants['blue']).includes(size)&&   <button onClick={()=>{refreshvariant('blue',size)}} className={`border-4   ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
             
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e)=>{refreshvariant(color,e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 text-base pl-3 pr-10">
                         {color&&   Object.keys(variants[color]).includes('m')   &&  <option value={'m'}>M</option>}
                          {color&&   Object.keys(variants[color]).includes('l')   &&  <option value={'l'}>L</option>}
                          { color && Object.keys(variants[color]).includes('xl')  && <option value={'xl'}>XL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
            { product.availqty>0&& <span className="title-font font-medium text-2xl text-gray-900">Rs:{product.price}.0</span>}
             { product.availqty>0&&<button onClick={() => { addCart(slug, 1, product.price, product.title, product.size, product.color,product.img) }} className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded"><a onClick={notify}>AddCart</a> </button>}
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
             {product.availqty>0?<button onClick={ ()=>{BuyNow(slug, 1, product.price, product.title, product.size, product.color,product.img)}} className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded" >BuyNow</button>:<h1 className="text-red-600">Out Of Stock!</h1> }

            </div>
            <div className="w-72 mt-6  flex ">
              <div className="relative h-10 w-full min-w-[200px]    ">
                <input
                  onChange={onChangePin}
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 border-b-black"
                  placeholder=" "
                />

                <label className=" before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500  ">
                  Pincode
                </label>
              </div>
              <button onClick={PinAvail} className="ml-10 text-xl cursor  text-white bg-gray-500 border-0 focus:outline-none hover:bg-gray-600 rounded">Avaialbility</button>
            </div>
            {service && service != null && <div>Available for delivery</div>}
            {!service && service != null && <div>Sorry!Not Available at this pincode</div>}


          </div>
       
        </div>
      </div>
    </section>
  </div>
}
 
   

export async function getServerSideProps(context) {
  let error=null;
  try {
    await connectMongo();
    let product = await Product.findOne({ slug: context.query.slug });
    if(product==error){
     return{
      props:{error:404}
     }
    }
    let variants = await Product.find({ title: product.title });
    let colorSizeSlug = {}//{red:{xl:{slug='itemtitle'}}}
    
    for (let item of variants) {
      if (Object.keys(colorSizeSlug).includes(item.color)) {
        colorSizeSlug[item.color][item.size] = { slug: item.slug }
      }
      else {
        colorSizeSlug[item.color] = {}
        colorSizeSlug[item.color][item.size] = { slug: item.slug }
      }
    }
    return {
     props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }
    }
  } catch (error) {
    console.log(error);
  }
} 

 