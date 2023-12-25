import express from 'express';
import {getAllUsers, userLogin, userSignUp} from "../controllers/users-controller.js";
import {check} from "express-validator";
import {fileUpload} from "../middleware/file-upload.js";

const router = express.Router();

router.get('/', getAllUsers);

router.post('/signup', fileUpload.single('image'), check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min: 6}), userSignUp);

router.post('/login', userLogin);


export const userRoutes = router;