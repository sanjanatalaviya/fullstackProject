const express = require('express');
const { productesController } = require('../../../../controller');
const upload = require('../../../middleware/upload');

const router = express.Router();

router.get('/get-productes/:product_id',
    productesController.getProductes
);

router.get('/list-productes',
    productesController.listProductes
);

router.post('/add-productes',
    upload.single('image'),
    productesController.addProductes
);

router.put('/update-productes/:product_id',
    productesController.updateProductes
);

router.delete('/delete-productes/:product_id',
    productesController.deleteProductes
    // (req, res) => {
    //     console.log("productes delete api.");
    //     res.send("productes delete api.");
    // }
);

module.exports = router;