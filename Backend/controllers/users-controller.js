import {validationResult} from "express-validator";
import {HttpErrors} from "../models/http-errors.js";
import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12)
        } catch (err) {
            return next(new HttpErrors('Could not create user, please try again later', 500));
        }
        const createdUser = new User({
            name,
            email,
            image: req.file.path,
            password: hashedPassword,
            places: []
        });
        try {
            await createdUser.save();
        } catch (err) {
            return next(new HttpErrors('Signing up failed, please try again later', 500));
        }
        let token;
        try {
            token = jwt.sign({
                userId: createdUser.id,
                email: createdUser.email
            }, "SUPER_SECRET_KEY_DO_NOT_DO_IT_LIKE_THIS!!", {expiresIn: '1h'});
        } catch (err) {
            return next(new HttpErrors('Signing up failed, please try again later', 500));
        }
        res.status(201).json({userId: createdUser.id, email: createdUser.email, token: token});
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
    if (!existingUser) {
        return next(new HttpErrors('Could Not Login, Please check credentials again', 403))
    }
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return next(new HttpErrors('Could Not Login, Please check credentials again', 500));
    }
    if (!isValidPassword) {
        return next(new HttpErrors('Could Not Login, Please check credentials again', 403))
    }
    let token;
    try {
        token = jwt.sign({
            userId: existingUser.id,
            email: existingUser.email
        }, "SUPER_SECRET_KEY_DO_NOT_DO_IT_LIKE_THIS!!", {expiresIn: '1h'});
    } catch (err) {
        return next(new HttpErrors('Login failed, please try again later', 500));
    }
    res.status(200).json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });
}