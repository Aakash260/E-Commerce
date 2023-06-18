import { Schema, model, models } from 'mongoose';

    
const SignupSchema= new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
 address:{type:String,default:''},
 pincode:{type:String,default:''},
 phone:{type:String,default:''},
 state:{type:String,default:''},
 city:{type:String,default:''},
    },
);
 
const Signup = models.Signup || model('Signup',SignupSchema);

export default Signup;


 

