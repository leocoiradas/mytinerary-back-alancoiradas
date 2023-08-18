import mongoose from "mongoose";

mongoose.connect()
.then(() => (console.log('conection succesful')))
.catch((err) => console.log(err))