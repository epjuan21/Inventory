const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routerApi = require('./routes');
const connectDB = require('./database');

const app = express();

// Settings
const port = process.env.PORT || 3000;
dotenv.config();

// Cors
const whitelist = ['http://localhost:3000'];
const options = {
    origin: (origin, callback) => {
        if ( whitelist.includes(origin) || !origin ) {
            callback(null, true);
        } else {
            callback(new Error('No Permitido'));
        }
    }
}

// Database
connectDB()

// Middlewares
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
routerApi(app);

// Server
app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`)
})
