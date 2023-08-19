import mongoose from "mongoose";

mongoose.connect(process.env.MONGO)
.then(() => (console.log('conection succesful')))
.catch((err) => console.log(err))