import {HttpErrors} from "../models/http-errors.js";
import {validationResult} from "express-validator";
import {getCoords} from "../util/location.js";
import {Place} from "../models/place.js";
import {User} from "../models/user.js";
import mongoose from "mongoose";

export const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let foundPlace;
    try {
        foundPlace = await Place.findById(placeId)
    } catch (err) {
        return next(new HttpErrors("Something went wrong, could not find a place.", 500));
    }
    if (!foundPlace) {
        return next(new HttpErrors("Could not find a place for the provided id.", 404));
    }
    res.json({place: foundPlace.toObject({getters: true})});
}

export const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let userPlaces;
    try {
        userPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        return next(new HttpErrors("Fetching places failed, please try again", 500));
    }
    if (!userPlaces || userPlaces.length === 0) {
        next(new HttpErrors("Could not find a place for the provided user id.", 404));
    } else {
        res.json({places: userPlaces.places.map(place => place.toObject({getters: true}))});
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
        console.log(err)
        return next(new HttpErrors(err.message, 422));
    }
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Empire_State_Building_%28aerial_view%29.jpg",
        creator
    });
    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        return next(new HttpErrors("Creating place failed, please try again.", 500));
    }
    if (!user) {
        return next(new HttpErrors("Could not find user for provided id.", 404));
    }
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdPlace.save({session: session});
        user.places.push(createdPlace);
        await user.save({session: session});
        await session.commitTransaction();
    } catch (err) {
        return next(new HttpErrors("Creating place failed, please try again.", 500));
    }
    res.status(201).json({place: createdPlace});
}

export const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        place = await Place.findByIdAndDelete(placeId, {session: session}).populate('creator');
        place.creator.places.pull(place);
        await place.creator.save({session: session});
        await session.commitTransaction();
    } catch (err) {
        return next(new HttpErrors("Something went wrong, could not delete place.", 500));
    }
    if (!place) {
        return next(new HttpErrors("Could not find place for this id.", 404));
    }
    res.status(200).json({message: "Deleted place."});
}
export const updatePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    const {title, description} = req.body;
    let place;
    if (description !== undefined && description.length < 5) {
        return next(new HttpErrors("Description must be at least 5 characters long.", 422));
    }
    try {
        place = await Place.findById(placeId);
        place.title = title || place.title;
        place.description = description || place.description;
        await place.save();
    } catch (err) {
        return next(new HttpErrors("Something went wrong, could not update place.", 500));
    }
    res.status(200).json({place: place.toObject({getters: true})});
}