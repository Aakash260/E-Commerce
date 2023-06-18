import connectMongo from "@/middleware/connectMongo";
import Order from "@/schema/order";
import Product from "@/schema/product";
 const PaytmChecksum = require("paytmchecksum");
export default async function addTest(req, res) {
    let order;
    var paytmChecksum="";
var paytmParams = {}
const received_data = req.body
 
for (var key in received_data){
    if (key == "CHECKSUMHASH") {
    paytmChecksum =received_data[key];
    } else {
    paytmParams[key] = received_data[key];  
    }
    }
    var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_KEY,paytmChecksum)
if(!isValidChecksum) {
res.send("Some error has occured")
return
}  
    try {

        await connectMongo();
        if (req.body.STATUS=='TXN_SUCCESS') {
   order=await Order.findOneAndUpdate( {orderId:req.body.ORDERID},{status:'PAID',paymentinfo:JSON.stringify(req.body),transactionId:req.body.TXNID})
   let products=order.products
   for (let slug in products) {
    
    await Product.findOneAndUpdate({slug: slug}, {$inc: {"availqty": - products[slug].qty }})
        }
    }else if(req.body.STATUS=='PENDING'){
         order= await Order.findOneAndUpdate( {orderId:req.body.ORDERID},{status:'PENDING',paymentinfo:JSON.stringify(req.body),transactionId:req.body.TXNID})
        }
        res.redirect('/order?clearCart=1&id='+ order._id,200)
        
    }
    catch (error) {
      
        res.json({ error });
    }

}
