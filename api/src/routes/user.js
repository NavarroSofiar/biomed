const express = require("express");
const router = express.Router();

//Controllers

const controller = require("../controllers/user.controllers")


router.post("/", controller.register)
router.get("/:email", controller.getByEmail)

module.exports = router;

