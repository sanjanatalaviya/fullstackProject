const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
            trim: true
        },
        password: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;