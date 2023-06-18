import connectMongo from '../../middleware/connectMongo';
import Signup from '@/schema/signup';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
export default async function addTest(req, res) {
    try {
        await connectMongo();
        if (req.method == 'POST') {
             const email=req.body.email
             const password=req.body.password
            let u = await Signup.findOne({ 'email': email })
            if (u) {
                var bytes = CryptoJS.AES.decrypt(u.password, process.env.AES_SECRET);
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                if (email == u.email && password == originalText) {

                    var token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "2d" });

                    res.status(200).json({ success: true, token, email: u.email })
                }
                else {
                    res.status(200).json({ error: "Invalid credentials" })
                }
            }
        }
        else {
            res.status(400).json({ error: "This method not allow(get method)" })
        }

    } catch (error) {

        console.log(error);
        res.json({ error });
    }

}

