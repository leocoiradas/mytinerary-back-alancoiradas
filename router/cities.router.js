import express from "express";
import citiesController  from "../controllers/cities.controller.js";


const router = express.Router()

router.get('/', citiesController.getCities )
router.get('/:id', citiesController.getCityById)
router.post('/', citiesController.createCity)
router.put('/:id', citiesController.updateCity)
router.delete('/', citiesController.deleteCity)

export default router