const { Schema, model } = require("mongoose");

//Repair Model Class
class RepairModel {
    messages = {
        notFound: "Repair not Found",
        notDeleted: "Repair was not Deleted",
        deleted: "Repair Successfully Deleted",
        success: "Repair Successfully Restored",
        updated: "Repair Successfully Updated",
        count: "Total Active:",
    };

    constructor() {
        const RepairSchema = new Schema(
            {
                order_number: { type: Number, required: true },
                equipment_name: { type: String, required: true },
                description: { type: String, required: true },
                service_equipment: { type: String,  required: true  },
                make: { type: String, required: true },
                model: { type: String, required: true },
                serial_number: { type: String, required: true },
                budget_date : {type: Date},
                price:{type:Number, required:true},
                company: { type: String, required: true },
                CCOO_number:{type:String, required:true},
                process_number:{type:String, required:true},
                OC_number:{type:String, required:true},
                condition: { type: String, required: true },
                deleted_at: { type: Date },
                condition_date : {type: Date}
            },
            {
                timestamps: true,
                versionKey: false,
            }



        );

        this.model = model("repair", RepairSchema);

    }

    // Methods

    async getAll() {
        return await this.model.find({deleted_at: null});
    }

    async getAllActives() {
        const repairCount = await this.model.countDocuments({
            deleted_at: { $exists: false },
        });
        const repair = await this.model
            .find({ deleted_at: null })
        return {
           
            repair,
        };
    }

    async getOne(id) {
        return await this.model
            .findById(id)

    }

    async create(repair) {
        const repairCreated = await this.model.create(repair);
        return repairCreated;

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

    async getByName(equipment_name) {
    const regex = new RegExp(equipment_name, 'i'); 
    return await this.model.find({ equipment_name: { $regex: regex }, deleted_at: null });
  }

}

module.exports = new RepairModel();