const Productes = require("../src/model/produtes.model");
const { uploadeFile } = require("../src/utils/cloudinary");

const listProductes = async (req, res) => {
    try {
        const productes = await Productes.find();

        if (!productes || productes.length === 0) {
            res.status(404).json({
                success: false,
                message: "productes not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "productes fetched successfully.",
            data: productes
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getProductes = async (req, res) => {
    try {
        const product = await Productes.findById(req.params.product_id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "product fetched successfully.",
            data: product
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addProductes = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const fileRes = await uploadeFile(req.file.path, "product");
    console.log(fileRes);
    try {
        const product = await Productes.create({
            ...req.body,
            image: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }
        });
        if (!product) {
            res.status(400).json({
                success: false,
                message: "product parameters is missing.",
            })
        }
        res.status(201).json({
            success: true,
            message: "product added successfully.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const deleteProductes = async (req, res) => {
    try {
        const product = await Productes.findByIdAndDelete(req.params.product_id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "product data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "product deleted successfully.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateProductes = async (req, res) => {
    try {
        const product = await Productes.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });
        if (!product) {
            res.status(404).json({
                success: false,
                message: "product data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "product updated successfully.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

module.exports = {
    listProductes,
    getProductes,
    addProductes,
    updateProductes,
    deleteProductes
}