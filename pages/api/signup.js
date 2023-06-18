import connectMongo from '../../middleware/connectMongo';
import Signup from '@/schema/signup';
var CryptoJS = require("crypto-js");
export default async function addTest(req, res) {
 
    try {
await connectMongo(); 
        if (req.method == 'POST') {
      const{email,name,password}=req.body
                let s= new Signup({
                    name:name,
                    email: email,
                    password: CryptoJS.AES.encrypt(password,process.env.AES_SECRET).toString()
               
                })
          
                await s.save();
            res.status(200).json({ success: "success" })
        }
        else {
            res.status(400).json({ error: "This method is not allowed" })
        }

    } catch (error) {
 
        console.log(error);
        res.json({ error });
    }
 
}

 
 