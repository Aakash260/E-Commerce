 

import connectMongo from "@/middleware/connectMongo";
import jsonwebtoken from "jsonwebtoken"
import Signup from "@/schema/signup";

export default async function addTest(req, res) {
  try {
 
    await connectMongo();
   if(req.method == 'POST' ){
let token = req.body.token
let user=jsonwebtoken.verify(token,process.env.JWT_SECRET)
 
let dbuser = await Signup.findOne({email:user.email})
 
const {name,email,address,pincode,phone,state,city} =dbuser
 res.status(200).json({ name,email,address,pincode,phone,state,city})
 
}
  } catch (error) {
    console.log(error);
    
    res.json({ error });
  }
}



