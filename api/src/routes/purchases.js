const express = require("express");
const router = express.Router();

//Controllers
const purchaseController = require ("../controllers/purchase_equipment.controller")

router.get("/",purchaseController.getItems);
router.get("/:id",purchaseController.getItem);
router.post("/", purchaseController.createItem);
router.put("/:id", purchaseController.updateItem);
router.delete("/:id", purchaseController.deleteItem);
router.get("/search/:name", purchaseController.getItemByName)

module.exports = router;