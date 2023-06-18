
import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    title:{type:String,required:true},
        slug:{type:String,required:true,unique:true},
       desc:{type:String,required:true},
        img:{type:String,required:true},
       category:{type:String,required:true},
       size:{type:String},
       color:{type:String},
       price:{type:Number,required:true},
       availqty:{type:Number,required:true},
  },
);
const Product = models.Product || model('Product',ProductSchema);
export default Product;


// import { Schema, model, models } from 'mongoose';

// const SignupSchema= new Schema({
//   name:{type:String,required:true},
//   email:{type:String,required:true,unique:true},
//   password:{type:String,required:true},
 
//     },
// );

// const Signup = models.Signup || model('Signup',SignupSchema);

// export default Signup;
