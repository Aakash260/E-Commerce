
import { Schema, model, models } from 'mongoose';
const OrderSchema= new Schema({
    email:{type:String,required:true},
    orderId:{type:String,required:true},
    paymentinfo:{type:String,default:''},
    address:{type:String,default:''},
        city:{type:Object,default:''},
        pincode:{type:Object,required:true},
       phone:{type:Object,required:true},
        products:{type:Object,required:true},
       name:{type:String,required:true},
        transactionId:{type:String,default:""},
        amount:{type:Number,required:true},
        status:{type:String,default:'INITIAL'},
        deliveryStatus:{type:String,default:'Unshipped'},
  },{timestamps:true}
);

const Order = models.Order || model('Order',OrderSchema);

export default Order;



