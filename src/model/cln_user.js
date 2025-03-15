const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(

    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }, {
    collection: "cln_users"
})

module.exports = mongoose.model("cln_users",userSchema)