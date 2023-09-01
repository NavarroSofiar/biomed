const express = require("express");
const router = express.Router();

//Controllers
const jobsController = require ("../controllers/jobs.controller")

router.get("/",jobsController.getItems);
router.get("/:id",jobsController.getItem);
router.post("/", jobsController.createItem);
router.put("/:id", jobsController.updateItem);
router.delete("/:id", jobsController.deleteItem);
router.get("/search/:name", jobsController.getItemByName)

module.exports = router;

