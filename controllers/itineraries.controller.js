import Itineraries from "../models/Itineraries.js";
import Users from "../models/Users.js";
import Cities from "../models/Cities.js";

const itinerariesController = {
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
    }
}