const express = require('express');
const router = express.Router();

const categoriesRouter = require("./categories.route");
const subcategoriesRouter = require("./subcategories.route");
const productesRouter = require("./productes.route");

router.use("/categories", categoriesRouter);
router.use("/subcategories", subcategoriesRouter);
router.use("/productes", productesRouter);

module.exports = router;