const { Schema, model } = require("mongoose");

//Purchase Model Class
class PurchaseModel {
    messages = {
        notFound: "Purchase not Found",
        notDeleted: "Purchase was not Deleted",
        deleted: "Purchase Successfully Deleted",
        success: "Purchase Successfully Restored",
        updated: "Purchase Successfully Updated",
        count: "Total Active:",
    };

    constructor() {
        const PurchaseSchema = new Schema(
            {
                order_number: { type: Number, required: true },
                equipment_name: { type: String, required: true },
                description: { type: String, required: true },
                service_equipment: { type: String,  required: true  },
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

        this.model = model("purchase", PurchaseSchema);

    }

    // Methods

    async getAll() {
        return await this.model.find({deleted_at: null});
    }

    async getAllActives() {
        const purchaseCount = await this.model.countDocuments({
            deleted_at: { $exists: false },
        });
        const purchase = await this.model
            .find({ deleted_at: null })
        return {
           
            purchase,
        };
    }

    async getOne(id) {
        return await this.model
            .findById(id)

    }

    async create(purchase) {
        const purchaseCreated = await this.model.create(purchase);
        return purchaseCreated;

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

module.exports = new PurchaseModel();