import express from 'express'; 
import itinerariesController from '../controllers/itineraries.controller.js'

const router = express.Router()

router.get('/', itinerariesController.getItineraries )
router.get('/by-city/:id', itinerariesController.getItinerariesByCity)
router.get('/by-id/:id', itinerariesController.getItineraryById)
router.post('/', itinerariesController.createItinerary)
router.put('/:id', itinerariesController.updateItinerary)
router.delete('/:id', itinerariesController.deleteItinerary)

export default router