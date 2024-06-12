const express = require('express');
const { categoriesController } = require('../../../../controller');

const router = express.Router();

router.get('/get-categories/:category_id',
    categoriesController.getCategory
);

router.get('/list-categories',
    categoriesController.listCategory
);

router.post('/add-category',
    categoriesController.addCategory
);

router.put('/update-category/:category_id',
    categoriesController.updateCategory
);

router.delete('/delete-category/:category_id',
    categoriesController.deleteCategory
    // (req, res) => {
    //     console.log("categories delete api.");
    //     res.send('categories delete api.');
    // }
);

module.exports = router;