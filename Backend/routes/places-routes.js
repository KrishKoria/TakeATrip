import express from "express";
import {HttpErrors} from "../models/http-errors.js";
const router = express.Router();


const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: "20 W 34th St, New York, NY 10001",
        creator: "u1"
    }
];

router.get("/:pid", (req, res, next) => {
    const placeId = req.params.pid;
    const foundPlace = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    if (!foundPlace) {
        next(new HttpErrors("Could not find a place for the provided id.", 404));
    } else {
        res.json({place: foundPlace});
    }
});

router.get("/user/:uid", (req, res, next) => {
    const userId = req.params.uid;
    const foundPlaces = DUMMY_PLACES.filter(u => {
        return u.creator === userId;
    })
    if (!foundPlaces || foundPlaces.length === 0) {
        next(new HttpErrors("Could not find a place for the provided user id.", 404));
    } else {
        res.json({places: foundPlaces})
    }
});

export const placesRoutes = router;