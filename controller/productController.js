const Product = require('../models/product');
const Variant = require('../models/productVarient');
const mongoose = require('mongoose');

//create product endpoint
module.exports.createProduct = async (req, res) => {
    try{
        const {name, description, price, variants} = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            variants: []
        });

        //checking if variants are provided, if yes, we will add it to the product and variants
        if(variants && variants.length > 0){
            const variantDocuments = await Variant.create(variants);

            //extracting variant IDs and associate them with the product
            const variantIds = variantDocuments.map((variant) => variant._id);
            product.variants = variantIds;

            await product.save();
        }

        res.status(201).json({ success: true, message: 'Product created successfully', data: product });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error'});
    }
}

//retrieve all products endpoint
module.exports.getAllProduct = async (req, res) => {
    try{
        const allProducts = await Product.find();

        return res.status(200).json({message: "Successfully got all the products", allProducts});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error'});
    }
}

//retrieve specific product endpoint
module.exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        
        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }
        
        // Find the product by ID
        const product = await Product.findById(productId);
        
        // Check if the product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        return res.status(200).json({ success: true, data: product });
      }

    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error'});
    }
}


//update a product endpoint
module.exports.updateProduct = async (req, res) => {
    try{
        const productId = req.params.productId;
        const { name, description, price, variants } = req.body;

        // Check if the product exists
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({message: 'Product not found'});
        }

        // Update the product properties
        existingProduct.name = name || existingProduct.name;
        existingProduct.description = description || existingProduct.description;
        existingProduct.price = price || existingProduct.price;

        // Update or add variants
        if (variants && variants.length > 0) {
            const variantDocuments = await Variant.create(variants);
  
            // Extract variant IDs and update the product's variants array
            const variantIds = variantDocuments.map((variant) => variant._id);
            existingProduct.variants = variantIds;
        }
  
        // Save the updated product
        const updatedProduct = await existingProduct.save();
  
        res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error'});
    }
}



//delete a product endpoint
module.exports.deleteProduct = async (req, res) => {
    try{
        const productId = req.params.productId;
        //check if product exist

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message: "Product does not exist"});
        }

        const deleteProduct = await Product.findByIdAndDelete(productId);

        return res.status(200).json({message: "Product deleted successfully", deleteProduct}); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error'});
    }
}

//get a product by search endpoint
module.exports.searchProducts = async (req, res) => {
    try {
      const searchTerm = req.query.q;
  
      // Create a regular expression pattern from the search term
      const regexPattern = new RegExp(escapeRegExp(searchTerm), 'i');
  
      // Search for products based on name, description, or variant name
      const products = await Product.find({
        $or: [
          { name: regexPattern },
          { description: regexPattern },
          { 'variants.name': regexPattern },
        ],
      });
  
      res.status(200).json({ success: true, data: products });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error'});
    }
  };
  
  // Helper function
  function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }