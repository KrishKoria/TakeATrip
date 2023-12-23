import {validationResult} from "express-validator";
import {HttpErrors} from "../models/http-errors.js";
import {User} from "../models/user.js";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        return next(new HttpErrors('Fetching users failed, please try again later', 500));
    }
    res.json({users: users.map(user => user.toObject({getters: true}))});
}

export const userSignUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpErrors('Invalid inputs passed, please check your data', 422))
    } else {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        let existingUser;
        try {
            existingUser = await User.findOne({email: email});
        } catch (err) {
            return next(new HttpErrors('Signing up failed, please try again later', 500));

        }
        if (existingUser) {
            return next(new HttpErrors('User exists already, please login instead', 422))
        }
        const createdUser = new User({
            name,
            email,
            image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
            password,
            places: []
        });
        try {
            await createdUser.save();
        } catch (err) {
            return next(new HttpErrors('Signing up failed, please try again later', 500));
        }

        res.status(201).json({user: createdUser.toObject({getters: true})});
    }
}

export const userLogin = async (req, res, next) => {
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (err) {
        return next(new HttpErrors('Login failed, please try again later', 500));
    }
    if (!existingUser || existingUser.password !== password) {
        return next(new HttpErrors('Could Not Login, Please check credentials again', 401))
    }

    res.status(200).json({message: 'User logged in'})

}