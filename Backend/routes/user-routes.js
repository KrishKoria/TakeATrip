import express from 'express';
import {getAllUsers, userLogin, userSignUp} from "../controllers/users-controller.js";

const router = express.Router();

router.get('/', getAllUsers);

router.post('/signup', userSignUp);

router.post('/login', userLogin);


export const userRoutes = router;