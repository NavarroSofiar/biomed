require("dotenv").config();

/* REQUIRED */
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./src/config/mongo")
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;

/* INITIALIZATIONS */
const app = express();

/* MIDDLEWARE */
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ROUTES */
app.use("/api", require("./src/routes"));

/* CONNECTION */
dbConnect();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));