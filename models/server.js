/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.userPath = '/api/user';
        this.rolePath = '/api/role';
        this.areaPath = '/api/area';
        this.groupPath = '/api/group';
        this.typePath = '/api/type';
        this.osPath = '/api/os';
        this.workstationPath = '/api/workstation';

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

        // Helmet
        this.app.use(helmet());

        // Compression
        this.app.use(compression());

        // File Upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: './uploads/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.rolePath, require('../routes/role'));
        this.app.use(this.areaPath, require('../routes/area'));
        this.app.use(this.groupPath, require('../routes/group'));
        this.app.use(this.typePath, require('../routes/type'));
        this.app.use(this.osPath, require('../routes/os'));
        this.app.use(this.workstationPath, require('../routes/workstation'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}

module.exports = Server;
