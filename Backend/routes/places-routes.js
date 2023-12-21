import express from "express";
import {
    createNewPlace,
    deletePlace,
    getPlaceById,
    getPlacesByUserId,
    updatePlace
} from "../controllers/places-controller.js";
import {check} from "express-validator";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", check('title').not().isEmpty(), check('description').isLength({min: 5}), check('address').not().isEmpty(), createNewPlace);

router.patch("/:pid",updatePlace);

router.delete("/:pid", deletePlace);
export const placesRoutes = router;