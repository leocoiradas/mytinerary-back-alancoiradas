import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema({
    user: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String},
    online: {type: Boolean, default: false},
    verified: {type: Boolean, default: false},
    verification_code: {type: String}
    
},{
    timestamps: true
});

const Users = new model(collection, schema);

export default Users