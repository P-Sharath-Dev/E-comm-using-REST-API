import ProductModel from "./product.model.js";

export default class ProductController{
    //get all products
    getAllProducts(req,res){
        const products = ProductModel.getAllProducts();
        return res.status(200).json(products);
    }

    //get a product
    getProductById(req,res){
        const productId = req.params.id;
        console.log(productId);

        const product = ProductModel.getProductById(productId);

        if(product){
            return res.status(200).json(product);
        }
        else{
            return res.status(404).send('product not found!!!!!!!!!!');
        }
    }

    //add product
    addProduct(req,res){
        console.log(req.body);
        const{name, description, imageUrl, category, price} = req.body;
        ProductModel.addProduct(name, description, imageUrl, category, price);
        const products = ProductModel.getAllProducts();
        return res.status(201).json(products);
    }

    //filtering products
    getFilteredProducts(req, res){
        console.log("req.query", req.query);
        const {minPrice, maxPrice, category} = req.query;
        const filteredProducts = ProductModel.getfilteredProducts(minPrice, maxPrice, category);
        return res.status(301).json(filteredProducts);
    }

    //update product
    updateProduct(req,res){
        console.log(req.body);
        const productId = req.params.id;
        const updateProduct = ProductModel.updateProduct(productId, req.body);
        if(updateProduct){
            return res.status(201).json(updateProduct);
        }
        else {
            return res.status(404).send('Product not found!');
        }

    }

    //delete product
    deleteProduct(req,res){

    }
}