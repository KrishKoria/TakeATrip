import express from 'express';
import {getAllUsers, userLogin, userSignUp} from "../controllers/users-controller.js";
import {check} from "express-validator";

const router = express.Router();

router.get('/', getAllUsers);

router.post('/signup', check('username').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min: 6}), userSignUp);

router.post('/login', userLogin);


export const userRoutes = router;