const mongoose = require('mongoose');

// Connect to the Mongo DB
const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB connected successfully ', connect.connection.host, connect.connection.name );
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbConnection;
