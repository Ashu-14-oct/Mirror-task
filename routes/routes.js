const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

//create product
router.post('/products', productController.createProduct);

//retrieve product
router.get('/products', productController.getAllProduct);

//search products by name, description, or variant name
router.get('/products/search', productController.searchProducts);

//retrieve a specific product by ID
router.get('/products/:productId', productController.getProduct);

//update a product by ID
router.put('/products/:productId', productController.updateProduct);

//delete a product by ID
router.delete('/products/:productId', productController.deleteProduct);



module.exports = router;