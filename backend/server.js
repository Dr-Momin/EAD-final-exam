require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const dbConnection = require('./config/dbConnection');
const cors = require('cors');


dbConnection();
const app = express();




// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static('upload'));
app.use(cors());



// Routes
app.use('/api', require('./routes/recipes'));


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})
