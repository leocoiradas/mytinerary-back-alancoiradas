import { Schema, model } from "mongoose";

let collection = 'cities';

let citiesSchema = new Schema({
    cityName: {type: String, required: true},
    img: {type: String, required: true},
    country: {type:String, required: true}
},{
    timestamps: true
})

const Cities = new model(collection, citiesSchema);
export default Cities
