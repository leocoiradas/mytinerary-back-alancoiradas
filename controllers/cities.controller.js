import Cities from '../models/Cities.js';

const citiesController = {
    getCities: async (req, res) => {

       let searchQueries = {};
        if (req.query.cityName) {
            searchQueries.cityName = new RegExp(`^${req.query.cityName}`, 'i');
        }
        /*if(req.query.category){
            searchQueries.category = req.query.category
        }*/
        try {
            const citiesSearch = await Cities.find(searchQueries)
            .populate({
                path: "itineraries",
                populate: {
                    path: "user",
                    model: "users"
                }
            })
            
            if(citiesSearch.length > 0){
                return res.status(200).json({
                    success: true,
                    cities : citiesSearch
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Cities not found',
                cities: citiesSearch
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
        try {
            const cityById = await Cities.findById(req.params.id)
            .populate({
                path: "itineraries",
                populate: {
                    path: "user",
                    model: "users"
                }
            })
            if(cityById){
                return res.status(200).json({
                    success: true,
                    message: 'City found',
                    cityById: cityById
                })
            }

            return res.status(404).json({
                success: false,
                message: 'No event could be found with the provided ID, please try again'
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
           return res.status(200).json({
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
        const cityId = req.params.id
        try {
            const updatedCity = await Cities.findByIdAndUpdate(cityId, req.body /*{}
                /*cityName: req.body.cityName,
                img: req.body.imgmg,
                country: req.body.country*/
            , { new: true })
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
            const deletedCity = await Cities.findByIdAndDelete(req.params.id)
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