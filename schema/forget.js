import { Schema, model, models } from 'mongoose';
const ForgotSchema = new Schema ({
userid: {type: String, required: true},
email: {type: String, required: true, unique: true},
token: {type: String, required: true},
}, {timestamps: true});
 

const Forget = models.Forget || model('Forget',OrderSchema);

export default Forget;