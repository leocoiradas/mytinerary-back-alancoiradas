import express from 'express'; 
import itinerariesController from '../controllers/itineraries.controller.js'

const router = express.Router()

router.get('/', itinerariesController.getItineraries )
router.get('/:city', itinerariesController.getItinerariesByCity)
router.get('/:id', itinerariesController.getItineraryById)
router.post('/', itinerariesController.createItinerary)
router.put('/:id', itinerariesController.updateItinerary)
router.delete('/:id', itinerariesController.deleteItinerary)

export default router