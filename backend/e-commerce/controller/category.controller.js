const Categories = require("../src/model/categories.model")

const listCategory = async (req, res) => {
    try {
        const categories = await Categories.find();
        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "categories not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "categories fetched successfully.",
            data: categories
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.category_id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: "category not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "category fetched successfully.",
            data: category
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addCategory = async (req, res) => {
    try {
        const category = await Categories.create(req.body);
        if (!category) {
            res.status(400).json({
                success: false,
                message: "category parameters is missing.",
            })
        }
        res.status(201).json({
            success: true,
            message: "category added successfully.",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Categories.findByIdAndDelete(req.params.category_id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: "category data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "category deleted successfully.",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateCategory = async (req, res) => {
    // console.log("hgsdhgsdg", req.params.category_id, req.body);
    try {
        const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, { new: true, runValidators: true });
        if (!category) {
            res.status(404).json({
                success: false,
                message: "category data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "category updated successfully.",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

module.exports = {
    listCategory,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
}