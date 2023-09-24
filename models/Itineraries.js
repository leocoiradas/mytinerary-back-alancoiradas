import { Schema, model, Types } from "mongoose";

const collection = "itineraries";

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'users'},
    city: { type: Types.ObjectId, ref: 'cities' },
    desc: {type: String},
    price: {type: String, required: true},
    duration: {type: String, required: true},
    hashtags: [{type: String, required: true}]
})

const Itineraries = new model(collection, schema);

export default Itineraries