const express = require("express");
const router = express.Router();
const fs = require("fs");

const pathRouter = `${__dirname}`;

const cleanFileName = (fileName) => {
  const file = fileName.split(".").shift();
  return file;
};

fs.readdirSync(pathRouter).filter((file) => {
  const cleanName = cleanFileName(file);
  const filesSkipped = ["index", "public"].includes(cleanName);
  if (!filesSkipped) {
    router.use(`/${cleanName}`, require(`./${cleanName}`));
    console.log("Loading Route ----->", cleanName);
  }
});

router.get("*", (req, res) => {
  res.status(404);
  res.send({
    error: "Not Found",
  });
});

module.exports = router;
