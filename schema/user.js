
import { Schema, model, models } from 'mongoose';

const UserSchema= new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
address:{type:String,default:""},
  pincode:{type:String,default:""},
  phone:{type:String,default:""},

    },
);

const User = models.User || model('User',UserSchema);

export default User;