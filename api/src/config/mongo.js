require("dotenv").config();
const mongoose = require("mongoose");

// url para conexión con mongo atlas
const database_name = process.env.DATABASE_NAME,
  database_pass = process.env.DATABASE_PASS,
  database_cluster = process.env.DATABASE_CLUSTER;

const dbConnect = () => {
  /* const DB_URI = `mongodb+srv://${database_name}:${database_pass}@${database_cluster}`; */
  const DB_URI = 'mongodb://localhost:27017/jobhiring'
  mongoose.set("strictQuery", false);
  mongoose.connect(DB_URI, (err, res) => {
    if (!err) console.log("*** SUCCEEDED CONNECTION ***");
    else console.log("*** CONNECTION ERROR ***");
  });
};

module.exports = { dbConnect };
