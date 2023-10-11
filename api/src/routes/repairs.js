const express = require("express");
const router = express.Router();

//Controllers
const repairController = require ("../controllers/repair_equipment.controller")

router.get("/",repairController.getItems);
router.get("/:id",repairController.getItem);
router.post("/", repairController.createItem);
router.put("/:id", repairController.updateItem);
router.delete("/:id", repairController.deleteItem);
router.get("/search/:name", repairController.getItemByName)

module.exports = router;