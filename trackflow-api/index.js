require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(morgan("tiny"));

// Define the port to listen on
const port = process.env.PORT || 3000;

// Define the mongodb database uri (uniform resource identifier)
const db = process.env.DB_URI;

mongoose 
        .connect(db)
        .then(() => console.log("Connected to MongoDB..."))
        .catch((err) => console.error("Could not connect to MongoDB...", err));

// Start listening on the specified port
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});