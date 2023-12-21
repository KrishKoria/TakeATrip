import {HttpErrors} from "../models/http-errors.js";
import {v4 as uuidv4} from 'uuid'
import {validationResult} from "express-validator";
import {getCoords} from "../util/location.js";
let DUMMY_PLACES = [
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

export const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const foundPlace = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    if (!foundPlace) {
        next(new HttpErrors("Could not find a place for the provided id.", 404));
    } else {
        res.json({place: foundPlace});
    }
}

export const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const foundPlaces = DUMMY_PLACES.filter(u => {
        return u.creator === userId;
    })
    if (!foundPlaces || foundPlaces.length === 0) {
        next(new HttpErrors("Could not find a place for the provided user id.", 404));
    } else {
        res.json({places: foundPlaces})
    }
}

export const createNewPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpErrors("Invalid inputs passed, please check your data.", 422));
    }
    const {title, description, address, creator} = req.body;
    let coordinates;
    try {
        coordinates = await getCoords(address);
    } catch (err) {
        return next(err);
    }
    const createdPlace = {
        id: uuidv4(),
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator
    }
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place: createdPlace});
}

export const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        next(new HttpErrors("Could not find a place for the provided id.", 404));
    } else {
        DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
        res.status(200).json({message: "Deleted place."});
    }
}
export const updatePlace = (req, res, next) => {
    const placeId = req.params.pid;
    const {title, description} = req.body;
    if (description.length < 5) {
        next(new HttpErrors("Description must be at least 5 characters long.", 422));
    } else {
        const foundPlace = DUMMY_PLACES.find(p => p.id === placeId);
        const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
        const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
        updatedPlace.title = title || foundPlace.title;
        updatedPlace.description = description || foundPlace.description;
        DUMMY_PLACES[placeIndex] = updatedPlace;
        res.status(200).json({place: updatedPlace});
    }
}