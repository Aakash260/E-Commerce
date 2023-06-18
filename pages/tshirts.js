 
import connectMongo from "@/middleware/connectMongo";
import Product from "@/schema/product";
import Link from "next/link";
 
export default function tshirts({data}){
  
  return ( 
 
 <section className="text-gray-600 body-font bg-[#b0b4b4] pt-[65vw] md:pt-[2vw]">
  <div className="container px-5 py-20 mx-auto">
  <div className="flex flex-wrap -m-4">
  { Object.keys(data).map((item)=>{
    
      return <Link key={data[item]._id} passhref='true' href={`/product/${data[item].slug}`} className="lg:w-1/4 md:w-1/2 p-4 w-full hover:border border-double" > 
       
      <div className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className=" w-full h-full block" src={data[item].img} />
        </div> 
        <div className="mt-2">
          <h2 className="text-gray-900 title-font text-lg font-medium">{data[item].title}</h2>
          <div className="flex">
                <span className="mr-3">Color:</span>
                {data[item].color.includes('white') &&   <button className="border-2 border-gray-300 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                {data[item].color.includes('gray') &&   <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}
           {data[item].color.includes('blue') &&    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              </div>
          <p className="">Rs:{data[item].price}</p>
        </div>
         
        </Link>
      })}
   
    </div>
  </div>
</section>
 
  )
}
 
export async function getServerSideProps(context) {
  try {
    await connectMongo();
    let data = await Product.find( {category:"T-Shirt"});
    let tshirts={}
    for(let item of data){
if(item.title in tshirts){
  if(!tshirts[item.title].color.includes(item.color)&&item.availqty>0){//phle color and size k array hoga hi nhi phle else chlega
    tshirts[item.title].color.push(item.color)
  }
  if(!tshirts[item.title].size.includes(item.size)&&item.availqty>0){
    tshirts[item.title].size.push(item.size)
  }
}else{//yha array bnega color and size ka
tshirts[item.title]=JSON.parse(JSON.stringify(item))//key=title, value =whole item
if(item.availqty>0){
  tshirts[item.title].size=[item.size]
  tshirts[item.title].color=[item.color]//array bn gaiga
  //Example- Abutilon: { 
  //   _id: '6464c04cc10283d8d99b0924',
  //   title: 'Abutilon',
  //   slug: 'sunflower3',
  //   desc: 'T-shirt belong to coder',
  //   img: 'req.body[i].img',
  //   category: 'T-Shirt',
  //   size: [ 'xl', 'sm' ],
  //   color: [ 'gray', 'white' ],
  //   price: 3,
  //   availqty: 3,
  //   __v: 0
  // },
}else{
  tshirts[item.title].color = []
  tshirts[item.title].size = []
}
}
    }
    return {
      props:{data:JSON.parse(JSON.stringify(tshirts))}
    }
  }catch(error) {
    console.log(error);  
  }
} 
 