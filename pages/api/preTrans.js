import connectMongo from "@/middleware/connectMongo";
import Order from "@/schema/order";
import Product from "@/schema/product";
const PaytmChecksum = require("paytmchecksum");
const https = require('https');
import pincodes from'../../pincodes.json' 
export default async function addTest(req, res) {
    try {

        await connectMongo();
        if (req.method == 'POST') {
     
            let product, sumTotal = 0;
            let cart = req.body.cart;
            if(!Object.keys(pincodes).includes(req.body.checkout.pincode)){
                res.status(200).json({ success: false, "error":  "Pincode unavailable" })
            }
            if(req.body.total<=0){
                res.status(200).json({ success: false, "error":  "Add things to cart first" })
            }
            for (let item in cart) {
                sumTotal += cart[item].price * cart[item].qty
                product = await Product.findOne({ slug: item })
                //order out of Stock
                if (product.availqty < cart[item].qty) {
                    res.status(200).json({ success: false, "error":  "Item Out of Stock" })
                    return
                }
                if (product.price != cart[item].price) {
                    res.status(200).json({ success: false, "error": "The price of some item  out of stock Try Again" ,cartClear:true })
                    return
                }

              
            }
            if (sumTotal !== req.body.total) {
                res.status(200).json({ success: false, "error": "The price of some item changed Try Again" ,cartClear:true})
                return
            }
            let order = new Order({
                email: req.body.email,
                name: req.body.checkout.name,
                orderId: req.body.oid,
                address: req.body.checkout.address,
                phone:req.body.checkout.phone,
                city:req.body.checkout.city,
                state:req.body.checkout.state,
                pincode:req.body.checkout.pincode,
                amount: req.body.total,
                products: req.body.cart,
                phone:req.body.checkout.phone
            });
                 
            await order.save();
            var paytmParams = {};

            paytmParams.body = {
                "requestType": "Payment",
                "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
                "websiteName": "YOUR_WEBSITE_NAME",
                "orderId": req.body.oid,
                "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
                "txnAmount": {
                    "value": req.body.total,
                    "currency": "INR",
                },
                "userInfo": {
                    "custId": req.body.checkout.email,
                },
            };

            /*
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_KEY)

            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);
            const requestAsync = async () => {
                return new Promise((resolve, reject) => {

                    var options = {

                        /* for Staging */
                        // hostname: 'securegw-stage.paytm.in',

                        /* for Production */
                        hostname: 'securegw.paytm.in',

                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };

                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });

                        post_res.on('end', function () {
                            console.log('Response: ', response + req.body.oid);
                            let ress = JSON.parse(response).body
                            ress.success = true;
                            ress.cartClear=false
                            resolve(ress)

                        });
                    });



                    post_req.write(post_data);
                    post_req.end();

                })
            }
            let myr = await requestAsync()
            res.status(200).json(myr)


        }
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
}
