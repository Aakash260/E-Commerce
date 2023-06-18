import Signup from '@/schema/signup';
import connectMongo from '@/middleware/connectMongo';
import jsonwebtoken from "jsonwebtoken"
var CryptoJS = require("crypto-js");
export default async function addTest(req, res) {
    try {
   
      await connectMongo();
     if(req.method == 'POST' ){
  let {token,password,cpassword,opassword} = req.body
  let user=jsonwebtoken.verify(token,process.env.JWT_SECRET)  
  let u=await Signup.findOne({"email":user.email})
  if(u){
    var bytes  = CryptoJS.AES.decrypt(u.password,process.env.AES_SECRET);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    if(opassword==originalText&&password==cpassword){
 
        let dbuser = await Signup.findOneAndUpdate({email: user.email},{ password:CryptoJS.AES.encrypt(password,process.env.AES_SECRET).toString()})
        res.status(200).json({sucess:true})
    }
    else{
     res.status(200).json({sucess:false})
   }
  }
  }
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
  
  