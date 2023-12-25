import jwt from 'jsonwebtoken';
import {HttpErrors} from "../models/http-errors.js";
export const checkToken = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    let token;
    try {
         token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication Failed, Please Try Again');
        }
    } catch (err) {
        return next(new HttpErrors('Authentication Failed, Please Try Again', 403))
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'SUPER_SECRET_KEY_DO_NOT_DO_IT_LIKE_THIS!!');
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (err) {
        return next(new HttpErrors('Authentication Failed, Please Try Again', 500))
    }

}