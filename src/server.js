require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");

const app = express();

// systemctl start mongodb
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;

db.on("error", err => console.error(err));
db.once("open", () => console.log("Connected to database"));

app.use(express.json())
app.use("/api", apiRouter)

app.listen(5000, () => console.log("Server started"));
