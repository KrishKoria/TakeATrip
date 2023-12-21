import express from "express";
import {
    createNewPlace,
    deletePlace,
    getPlaceById,
    getPlacesByUserId,
    updatePlace
} from "../controllers/places-controller.js";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", createNewPlace);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);
export const placesRoutes = router;