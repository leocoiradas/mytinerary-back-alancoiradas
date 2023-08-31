import Itineraries from "../models/Itineraries.js";
import Users from "../models/Users.js";
import Cities from "../models/Cities.js";

const itinerariesController = {

    getItineraries: async (req, res) => {
        try {
            const itineraries = await Itineraries.find();
            return res.status(200).json({
                success: true,
                message: "Itineraries received correctly",
                itineraries
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                success: false, 
                message: "There was an error while getting the itineraries"
            })
        }
    },

    getItinerariesByCity: async (req, res) => {
        try {
            const cityName = req.params.cityName
            const itinerariesByCity = await Itineraries.find({city: cityName});
            return res.status(200).json({
                success: true,
                message: "Itineraries by city found",
                city: cityName,
                itinerariesByCity
            })
            
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                success: false,
                message: "Itineraries not found with the city provided",
                city: cityName
            })
        }
    }, 

    getItineraryById: async (req, res) => {
        try {
            const itineraryById = await Itineraries.findById(req.params._id);
            return res.status(200).json({
                success: true,
                message: "Itinerary found by id",
                itineraryById
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                success: false,
                message: "Itinerary not found with the provided id"
            })
        }
    }, 

    createItinerary: async (req, res) => {
        try {
            const currentUserId = await Users.findById(req.body._id);
            const currentCityId = await Cities.findById(req.body._id);
            if (currentUserId === null || currentCityId === null) {
                return res.status(404).json({
                    success: false,
                    message: "We could not find an existing username or city. Please try again"
                })
            }
            const newItinerary = await Itineraries.create(req.body);
            return res.status(200).json({
                success: true,
                message: "Itinerary succesfully created",
                newItinerary
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "The itinerary could not be created"
            })
        }
    },
    
    updateItinerary: async (req, res) => {
        const itineraryId = req.params._id
        try {
           const updatedItinerary = await Itineraries.findByIdAndUpdate(itineraryId, req.body, {new: true}) ;
           return res.status(200).json({
            success: true,
            message: "Itinerary succesfully updated",
            updatedItinerary
           })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "The itinerary could not be updated"
            })
        }
    }, 

    deleteItinerary: async (req, res) => {
        try {
            const deletedItinerary = await Itineraries.findByIdAndDelete(req.params.id)
            if (!deletedItinerary){
                return res.status(404).json({
                    success: false,
                    message: 'We could not find and delete the itinerary you are looking for'
                })
            }
           return res.status(200).json({
                success: true,
                message: 'Itinerary deleted succesfully'
            })
        } catch (error) {
            console.log(error)
           return res.status(500).json({
                success: false,
                message: 'The itinerary could not be deleted'
            })
        }
    }
}