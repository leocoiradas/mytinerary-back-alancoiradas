import express from "express";
import citiesController  from "../controllers/cities.controller.js";


const router = express.Router()

router.get('/cities', citiesController.getCities )
router.get('/cities:id', citiesController.getCityById)
router.post('/cities', citiesController.createCity)
router.put('/cities', citiesController.updateCity)
router.delete('/cities', citiesController.deleteCity)

export default router