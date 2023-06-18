
import connectMongo from '../../middleware/connectMongo';
import Product from '../../schema/product';
export default async function addTest(req, res) {
  try {
 
    await connectMongo();
    let products = await Product.find();
    res.json({products});
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}



