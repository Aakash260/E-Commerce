import jsonwebtoken from 'jsonwebtoken'
import connectMongo from '@/middleware/connectMongo'
import Order from '@/schema/order'
 
  export default async function addTest(req, res) {
    try {

        await connectMongo();
        const token=req.body.token
        const Exuser=req.body.Extuser
        
        const email=req.body.email
        if(Exuser){
            
            let orders=await Order.find({ email:email}) 
            res.json({orders})
        }   
else{

    const data=jsonwebtoken.verify(token,process.env.JWT_SECRET);
    let orders=await Order.find({ email:data.email}) 
    res.json({orders})
}
 
     
    }
    catch (error) {
        console.log(error);
        res.json({ error:"catch" });
    }
}
 