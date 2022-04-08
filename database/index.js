const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(db => console.info(`Mongo DB Connected: ${db.connection.name}`))
        .catch(err => console.error(err))
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit()
    }
}

module.exports = connectDB;
