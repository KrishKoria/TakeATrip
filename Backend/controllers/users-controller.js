import {v4 as uuidv4} from 'uuid'
import {validationResult} from "express-validator";
import {HttpErrors} from "../models/http-errors.js";

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        email: 'test@test.com',
        password: 'testers'
    }
];

export const getAllUsers = (req, res) => {
    res.json({users: DUMMY_USERS})
}

export const userSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpErrors('Invalid inputs passed, please check your data', 422))
    } else {
        const {username, email, password} = req.body;
        const hasUser = DUMMY_USERS.find(user => user.email === email);
        if (hasUser) {
            next(new HttpErrors('User already exists, Please login instead', 422))
        }
        const newUser = {
            id: uuidv4(),
            name: username,
            email,
            password
        }
        DUMMY_USERS.push(newUser);
        res.status(201).json({user: newUser})
    }
}

export const userLogin = (req, res, next) => {
    const {email, password} = req.body;
    const foundUser = DUMMY_USERS.find(user => user.email === email && user.password === password);
    if (!foundUser) {
        next(new Error('User not found, Please check credentials again', 401))
    } else {
        res.status(200).json({message: 'User logged in'})
    }
}