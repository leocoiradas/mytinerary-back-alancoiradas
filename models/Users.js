import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema({
    username: {type: String, required: true},
    userImg: {type: String, required: true}
},{
    timestamps: true
});

const Users = new model(collection, schema);

export default Users