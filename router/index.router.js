import express from 'express';
import citiesRouter from './cities.router.js';
import itinerariesRouter from './itineraries.router.js'

const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Hello World')
})

router.use('/cities', citiesRouter)
router.use('/itineraries', itinerariesRouter)

export default router