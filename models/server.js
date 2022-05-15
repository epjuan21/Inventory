/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.userPath = '/api/user';

        // Connect to DB
        this.connectDB();

        // Middlewares
        this.middlewares();

        // CORS Options
        this.whitelist = ['http://localhost:3000'];
        this.options = {
            origin: (origin, callback) => {
                if (this.whitelist.includes(origin) || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('No Permitido'));
                }
            }
        }

        // Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors(this.options));

        // Body Parser
        this.app.use(express.json());

        // URL Encoded
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}

module.exports = Server;
