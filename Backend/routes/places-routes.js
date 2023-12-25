import express from "express";
import {
    createNewPlace,
    deletePlace,
    getPlaceById,
    getPlacesByUserId,
    updatePlace
} from "../controllers/places-controller.js";
import {check} from "express-validator";
import {fileUpload} from "../middleware/file-upload.js";
import {checkToken} from "../middleware/auth-check.js";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.use(checkToken);

router.post("/", fileUpload.single('image'), check('title').not().isEmpty(), check('description').isLength({min: 5}), check('address').not().isEmpty(), createNewPlace);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);
export const placesRoutes = router;