const purchaseModel = require("../models/purchase_equipment.model")
const { handleHttpError } = require("../utils/error.handle");

const purchaseController = {
    getItems: async (req, res) => {
        try {
            const items = await purchaseModel.getAll();
            res.status(200);
            res.send(items);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_GET_ALL_PURCHASES", 500);
        }
    },

    getItemsActives: async (req, res) => {
        try {
            const items = await purchaseModel.getAllActives();
            res.status(200);
            res.send(items);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_GET_ALL_ITEMS_ACTIVES", 500);
        }
    },

    getItem: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await purchaseModel.getOne(id);
            res.status(200);
            res.send(item);
        } catch (e) {
            handleHttpError(res, "ERROR_IN_SEARCH_BY_ID", 500);
        }
    },

    createItem: async (req, res) => {
        const purchase = req.body
        try {
            const newPurchase = await purchaseModel.create(purchase);
            res.status(201);
            res.send(newPurchase);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_CREATED_PURCHASE", 500);
        }
    },

    updateItem: async (req, res) => {
        try {
            const { id } = req.params;
            const purchase = req.body;
            const updateItem = await purchaseModel.update(id, purchase);
            res.status(201);
            res.send(updateItem);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_UPDATED_PURCHASE", 500);
        }
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await purchaseModel.delete(id);
            res.status(201);
            res.send(deleted);
        } catch (e) {
            handleHttpError(res, "ERROR_DELETED_PURCHASE", e);
        }
    },

    getItemByName: async (req, res) => {
        const { equipment_name } = req.params;
        try {
          const item = await purchaseModel.getByName(equipment_name);
          if (item) {
            res.status(200).send(item);
          } else {
            handleHttpError(res, 'PURCHASE_NOT_FOUND', 404);
          }
        } catch (e) {
          console.error(e);
          handleHttpError(res, 'ERROR_IN_SEARCH_BY_NAME', 500);
        }
      },
};


module.exports = purchaseController;