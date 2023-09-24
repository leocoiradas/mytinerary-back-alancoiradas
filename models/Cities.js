import { Schema, model, Types } from "mongoose";

let collection = 'cities';

let citiesSchema = new Schema({
    cityName: {type: String, required: true},
    img: {type: String, required: true},
    country: {type: String, required: true},
    desc: {type: String},
    touristSpots: {type: String},
    gastronomy: {type: String},
    currency: {type: String},
    itineraries: [{type: Types.ObjectId, ref: 'itineraries'}]
},{
    timestamps: true
})

const Cities = new model(collection, citiesSchema);
export default Cities
