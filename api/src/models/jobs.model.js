const { Schema, model } = require("mongoose");

//Job Model Class
class JobModel {
    messages = {
        notFound: "Job not Found",
        notDeleted: "Job was not Deleted",
        deleted: "Job Successfully Deleted",
        success: "Job Successfully Restored",
        updated: "Job Successfully Updated",
        count: "Total Active:",
    };

    constructor() {
        const JobSchema = new Schema(
            {
                name: { type: String, required: true },
                job_title: { type: String,  required: true  },
                experience: { type: String, required: true },
                location: { type: String, required: true },
                about_us: { type: String, required: true },
                job_responsabilities: { type: String, required: true },
                job_description: { type: String, required: true },
                deleted_at: { type: Date },
                expiration_date : {type: Date}
            },
            {
                timestamps: true,
                versionKey: false,
            }



        );

        this.model = model("job", JobSchema);

    }

    // Methods

    async getAll() {
        return await this.model.find({deleted_at: null});
    }

    async getAllActives() {
        const jobCount = await this.model.countDocuments({
            deleted_at: { $exists: false },
        });
        const job = await this.model
            .find({ deleted_at: null })
        return {
            /* message: `${this.messages.count} ${jobCount}`, */
            job,
        };
    }

    async getOne(id) {
        return await this.model
            .findById(id)

    }

    async create(job) {
        const jobCreated = await this.model.create(job);
        return jobCreated;

    }

    async update(id, update) {
        const updated = await this.model.findByIdAndUpdate(
            id,
            { $set: update },
            {
                new: true,
            }
        );
        return {
            message: this.messages.updated,
            article: updated,
        };
    }

    async delete(id) { 
        await this.model.findByIdAndUpdate(
            id,
            {
                deleted_at: Date.now(),
            },
            { new: true } 
        );
        return {
            message: this.messages.deleted,
        };
    }

}

module.exports = new JobModel();