const userModel = require("../models/user.model")

const userController = {

    register: async (req, res) => {

        const user = req.body

        try {

            if (!user.email || !emailValidation(user.email) || await userModel.existsByEmail(user.email)) throw new Error("Missing or invalid user email input!")
            if (!user.password || !passwordValidation(user.password)) throw new Error("Missing or invalid user password input!")

            await userModel.create(user)

            return res.status(201).send("User created successfully!")

        } catch (e) {
            console.log("esto pasa",e)
            return res.status(500).send(`User could not be registered: ${e.message || e}`)
        }

    },


    getByEmail: async (req, res) => {

        const { email } = req.params

        try {

            if (!email || !emailValidation(email)) throw new Error("Missing or invalid user email input!")

            const user = await userModel.getByEmail(email)

            if (!user) throw new Error("User does not exist!")

            return res.status(200).send({ firstName: user.firstName, lastName: user.lastName, email: user.email })

        } catch (e) {
            console.log(e)
            return res.status(500).send(`User could not be returned: ${e.message || e}`)
        }

    }

    
}

module.exports = userController

/* LOCAL FUNCTIONS */

function fieldValidation(input) {
    return typeof input === "string" && input.trim(" ").length > 0
}

function emailValidation(input) {
    return fieldValidation(input) && input.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) != null
}

function passwordValidation(input) {
    // password must contain 1 number, 1 special character and at least 6 characters and max of 16
    return fieldValidation(input) && input.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) != null
}