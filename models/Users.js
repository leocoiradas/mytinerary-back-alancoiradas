import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema({
    user: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    country: {type: String, required: true},
    google: {type: Boolean, default: false},
    online: {type: Boolean, default: false},
    verified: {type: Boolean, default: true},
    verification_code: {type: String}
    
},{
    timestamps: true
});

const Users = new model(collection, schema);

export default Users