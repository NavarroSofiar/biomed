const repairModel = require("../models/repair_equipment.model")
const { handleHttpError } = require("../utils/error.handle");

const repairController = {
    getItems: async (req, res) => {
        try {
            const items = await repairModel.getAll();
            res.status(200);
            res.send(items);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_GET_ALL_REPAIR", 500);
        }
    },

    getItemsActives: async (req, res) => {
        try {
            const items = await repairModel.getAllActives();
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
            const item = await repairModel.getOne(id);
            res.status(200);
            res.send(item);
        } catch (e) {
            handleHttpError(res, "ERROR_IN_SEARCH_BY_ID", 500);
        }
    },

    createItem: async (req, res) => {
        const repair = req.body
        try {
            const newRepair = await repairModel.create(repair);
            res.status(201);
            res.send(newRepair);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_CREATED_REPAIR", 500);
        }
    },

    updateItem: async (req, res) => {
        try {
            const { id } = req.params;
            const repair = req.body;
            const updateItem = await repairModel.update(id, repair);
            res.status(201);
            res.send(updateItem);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_UPDATED_REPAIR", 500);
        }
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await repairModel.delete(id);
            res.status(201);
            res.send(deleted);
        } catch (e) {
            handleHttpError(res, "ERROR_DELETED_REPAIR", e);
        }
    },

    getItemByName: async (req, res) => {
        const { equipment_name } = req.params;
        try {
          const item = await repairModel.getByName(equipment_name);
          if (item) {
            res.status(200).send(item);
          } else {
            handleHttpError(res, 'REPAIR_NOT_FOUND', 404);
          }
        } catch (e) {
          console.error(e);
          handleHttpError(res, 'ERROR_IN_SEARCH_BY_NAME', 500);
        }
      },
};


module.exports = repairController;