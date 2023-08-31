const jobsModel = require("../models/jobs.model")
const { handleHttpError } = require("../utils/error.handle");

const jobsController = {
    getItems: async (req, res) => {
        try {
            const items = await jobsModel.getAll();
            res.status(200);
            res.send(items);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_GET_ALL_JOBS", 500);
        }
    },

    getItemsActives: async (req, res) => {
        try {
            const items = await jobsModel.getAllActives();
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
            const item = await jobsModel.getOne(id);
            res.status(200);
            res.send(item);
        } catch (e) {
            handleHttpError(res, "ERROR_IN_SEARCH_BY_ID", 500);
        }
    },

    createItem: async (req, res) => {
        const job = req.body
        try {
            const newJob = await jobsModel.create(job);
            res.status(201);
            res.send(newJob);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_CREATED_JOB", 500);
        }
    },

    updateItem: async (req, res) => {
        try {
            const { id } = req.params;
            const job = req.body;
            const updateItem = await jobsModel.update(id, job);
            res.status(201);
            res.send(updateItem);
        } catch (e) {
            console.log(e)
            handleHttpError(res, "ERROR_UPDATED_JOB", 500);
        }
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await jobsModel.delete(id);
            res.status(201);
            res.send(deleted);
        } catch (e) {
            handleHttpError(res, "ERROR_DELETED_JOB", e);
        }
    },
};


module.exports = jobsController;