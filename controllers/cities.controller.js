
import '../models/Cities.js'
import Cities from '../models/Cities.js';
const citiesController = {
    getCities: async (req, res) => {
        console.log(req.query)
        let searchQueries = {};
        if (req.queries.name){
            searchQueries.name = req.query.name
        }
        try {
            const citiesSearch = await Cities.find(req.query)
            return res.status(200).json({
                success: true,
                cities : citiesSearch
            })
        } catch (error) {
            console.log(error);
           return res.status(500).json({
                success: false,
                message: 'No cities were found'
            })
        }

    },
    getCityById: async (req, res) => {
        console.log(req.query)
        
        try {
            const eventById = await Cities.findById(req.query.id)
           return res.status(200).json({
                success: true,
                message: 'City found',
                eventById: eventById
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'We could not found any city with the provided ID'
            })
        }
    },
    createCity: async (req, res) => {
        try {
            const newCity = await Cities.create(req.body);
           return res.status(201).json({
                success: true,
                message: 'City created succesfully',
                newCity: newCity
            })
        } catch (error) {
            console.log(error);
           return res.status(500).json({
                success: false,
                message: 'The city could not be created'
            })
        }

    },
    updateCity: async (req, res) => {
        const cityId = req.query.cityId
        try {
            const updatedCity = await Cities.findOneAndUpdate(cityId, {
                cityName: req.body.newName,
                img: req.body.newImg,
                country: req.body.newCountry
            }, { new: true })
           return res.status(201).json({
                success: true,
                message: 'City Updated succesfully',
                updatedCity: updatedCity
            })
        } catch (error) {
            console.log(error)
           return res.status(500).json({
                success: false,
                message: 'The city could not be updated correctly'
                
            })
        }
    },
    deleteCity: async (req, res) => {
        try {
            const deletedCity = await Cities.findOneAndDelete(req.query)
            if (!deletedCity){
                return res.status(404).json({
                    success: false,
                    message: 'We could not find and delete the city you are looking for'
                })
            }
           return res.status(200).json({
                success: true,
                message: 'City deleted succesfully'
            })
        } catch (error) {
            console.log(error)
           return res.status(500).json({
                success: false,
                message: 'The city could not be deleted'
            })
        }
    }
}
export default citiesController