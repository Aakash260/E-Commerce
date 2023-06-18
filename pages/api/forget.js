import Forget from "@/schema/forget"
import Signup from "@/schema/signup"
import connectMongo from "@/middleware/connectMongo"
var CryptoJS = require("crypto-js");
export default async function addTest(req, res) {

    if (req.body.sendMail) {//case1: isme email bejke denge password

        let token = `fyuggetklrheuithgierhlw`//create unique token not like this later
        let forget = new Forget({
            email: req.body.email,
            token: token
        })
        let email = `we have send an email by ThemeCloths.com 
        to reset your password click the following below    
        <a href="http://localhost:3000/forget?token=${token}"`
    }         
 
 else{//password reset
   
   
        await connectMongo();
       if(req.method == 'POST'&& !req.body.sendMail){
    let {password,email} = req.body
    let u=await Signup.findOne({"email":email})
    if(u){
       
        let dbuser = await Signup.findOneAndUpdate({email: u.email},{ password:CryptoJS.AES.encrypt(password,process.env.AES_SECRET).toString()})
 
        res.status(200).json({sucess:true})
    }
      else{
       res.status(200).json({sucess:false})
     }
    
    }
       
 }
  
    res.status(200).json({ success: false })
   
}



