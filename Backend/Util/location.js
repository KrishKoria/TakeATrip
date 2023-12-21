import axios from 'axios';
import {HttpErrors} from "../models/http-errors.js";
import dotenv from 'dotenv';

dotenv.config();
export const getCoords = async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${process.env.API_KEY}`);
    const data = response.data;
    if (!data || data.status === 'ZERO_RESULTS') {
        throw new HttpErrors('Could not find location for the specified address.', 422);
    }
    return data.results[0].geometry.location;
}