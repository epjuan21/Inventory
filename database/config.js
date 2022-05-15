/* eslint-disable no-console */
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(db => console.info(`Mongo DB Connected: ${db.connection.name}`))
        .catch(err => console.error(err))
    } catch (error) {
        console.error(`Error: ${error.message}`)
        throw new Error('Error connecting to DB');
    }
}

module.exports = {
    dbConnection
};
