const express = require('express');
const connectDB = require('../db/mongodb');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const route = require("./routes/api/v1/index");

connectDB();

app.use("/api/v1", route);

app.listen(8000, () => {
    console.log("server is started at port 8000.");
})