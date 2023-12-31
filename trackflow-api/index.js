require("dotenv").config();
const users = require("./routes/users");
const projects = require("./routes/projects");
const tasks = require("./routes/tasks");
const members = require("./routes/members");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/tasks", tasks);
app.use("/api/members", members);
app.use("/api/auth", auth);

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