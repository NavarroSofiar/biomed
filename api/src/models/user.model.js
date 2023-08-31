const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")


class UserModel {

    constructor() {
        const userSchema = new Schema(
            {
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                role: { type: String, default: "regular" },
                first_name: { type: String, required: true },
                last_name: { type: String, required: true },

            },
            {
                timestamps: true,
                versionKey: false,
            }
        );

        this.model = model("User", userSchema);
    }
    // Methods
    async create(user) {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(12))
        await this.model.create(user)
    }

    async existsByEmail(email) {
        return await this.model.exists({ email })
    }

    async getByEmail(email) {
        return await this.model.findOne({ email }).lean()
    }


}
module.exports = new UserModel()