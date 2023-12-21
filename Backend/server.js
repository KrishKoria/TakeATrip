import express from 'express';
import bodyParser from 'body-parser';
import {placesRoutes} from './routes/places-routes.js';

const app = express();
app.use(bodyParser.json({extended: false}));

app.use('/api/places', placesRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({message: error.message || "An unknown error occurred!"});
});
app.listen(5000, () => console.log('Server running on port 5000!'));