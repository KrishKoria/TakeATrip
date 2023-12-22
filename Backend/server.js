import express from 'express';
import bodyParser from 'body-parser';
import {placesRoutes} from './routes/places-routes.js';
import {userRoutes} from "./routes/user-routes.js";
import mongoose from "mongoose";
import {HttpErrors} from "./models/http-errors.js";

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use('/api/users', userRoutes);
app.use((req, res, next) => {
     next(new HttpErrors('Could not find this route.', 404));
});
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({message: error.message || "An unknown error occurred!"});
});

mongoose.connect('mongodb+srv://krish:banana1234@cluster0.sirovsp.mongodb.net/places?retryWrites=true&w=majority').then(()=> {
    app.listen(5000, () => console.log('Server running on port 5000!'));
}).catch(err => {
    console.log(err);
});