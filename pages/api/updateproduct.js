import connectMongo from '../../middleware/connectMongo';
import Product from '../../schema/product';

export default async function addTest(req, res) {
    try {
         

await connectMongo();
 
        if (req.method == 'POST') {
            for (let i = 0; i < req.body.length; i++) {
        let p= await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
    }
      
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

 
 