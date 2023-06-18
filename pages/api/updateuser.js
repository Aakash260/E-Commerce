import Signup from '@/schema/signup';
import connectMongo from '@/middleware/connectMongo';
import jsonwebtoken from "jsonwebtoken"
 
export default async function addTest(req, res) {
    try {
   
      await connectMongo();
     if(req.method == 'POST' ){
  let token = req.body.token
  let {name,phone,pincode,state,address,city}=req.body.checkout
  let user=jsonwebtoken.verify(token,process.env.JWT_SECRET)  
  let dbuser = await Signup.findOneAndUpdate({email: user.email},{name:name,address:address,pincode:pincode,phone:phone,state:state,city:city,})
res.status(200).json({sucess:true})
  }
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
  
  