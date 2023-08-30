import { Schema, model, Types } from "mongoose";

const collection = "itineraries";

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'users'},
    price: [{type: String, required: true}],
    duration: {type: Number, required: true},
    hashtags: [{type: String, required: true}]
})

const Itineraries = new model(collection, schema);

export default Itineraries