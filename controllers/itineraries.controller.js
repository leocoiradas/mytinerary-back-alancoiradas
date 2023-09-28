import Itineraries from "../models/Itineraries.js";
import Users from "../models/Users.js";
import Cities from "../models/Cities.js";

const itinerariesController = {

    getItineraries: async (req, res) => {
        try {
            const itineraries = await Itineraries.find()
                .populate("user", "user")
                .populate("city", "cityName");
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
            const cityId = req.params.id;
            const itinerariesByCity = await Itineraries.find({ city: cityId })
                .populate("user", "username")
                .populate("city", "cityName");

            if (itinerariesByCity.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Itineraries found by city",
                    city: cityId,
                    itinerariesByCity
                })
            }
            return res.status(404).json({
                success: true,
                message: "There is no itineraries in this city"
            })

        } catch (error) {
            console.log(error)
            return res.status(404).json({
                success: false,
                message: "Itineraries not found with the  provided city",

            })
        }
    },

    getItineraryById: async (req, res) => {
        try {
            const itineraryById = await Itineraries.findById(req.params.id)
                .populate("user", "username")
                .populate("city", "cityName");

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
            const currentUserId = await Users.findById(req.body.user);
            const currentCityId = await Cities.findById(req.body.city);

            if (!currentUserId || !currentCityId) {
                return res.status(404).json({
                    success: false,
                    message: "We could not find an existing username or city. Please try again"
                })
            }
            const newItinerary = await Itineraries.create(req.body);

            const updatedCity = await Cities.findByIdAndUpdate(
                req.body.city, // ID de la ciudad
                { $push: { itineraries: newItinerary._id } },
                { new: true }
            );

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
            const updatedItinerary = await Itineraries.findByIdAndUpdate(itineraryId, req.body, { new: true });
            return res.status(201).json({
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
            if (!deletedItinerary) {
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
};

export default itinerariesController