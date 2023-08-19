import 'dotenv/config.js';
import './config/db.js';
import express from 'express';
import morgan from "morgan";
import cors from 'cors';
import citiesRouter from './router/cities.router.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded( {extended: false} ))
app.use(morgan('dev'))
app.use(cors())
app.use('/api', citiesRouter)

app.listen(PORT, () => console.log('Server running on port ' + PORT));