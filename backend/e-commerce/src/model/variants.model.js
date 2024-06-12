const mongoose = require('mongoose');

const attibutesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    }
)

const variantsSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        desciption: {
            type: String,
            required: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        attibutesSchema: [attibutesSchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Variants = mongoose.model("Variants", variantsSchema);
module.exports = Variants;