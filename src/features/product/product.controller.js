import ProductModel from "./product.model.js";

export default class ProductController{
    //get all products{}
    getAllProducts(req,res){
        const products = ProductModel.getAllProducts();
        return res.status(200).json(products);
    }

    //get a product
    getProductById(req,res){
        const productId = req.params.id;

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

        const{name, description, category, price} = req.body;
        const imageUrl = req.file ? `/imageFiles/${req.file.filename}` : null;

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

    // rate produt
    rateProduct(req, res){
        //destructuring
        const {rating, productId} = req.body;
        const userId = req.userId;
        if(!rating || !productId){
            return res.status(400).send("bad request");
        }
        //  rating  between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).send("Rating must be 1 to 5 only");
        }
        //try{
            ProductModel.rateProduct(rating, userId, productId);
            return res.status(200).send("rating added successfully")
        //}catch(e){
        //    console.log(`error : ${e}`)
        //    return res.status(400).send(e.message);
        //}
    }

    //update product
    updateProduct(req,res){
        console.log(req.body);
        const productId = req.params.id;

        const imageUrl = req.file ? `/imageFiles/${req.file.filename}` : req.body.imageUrl;

        const updatedData = {
            name : req.body.name,
            description : req.body.description,
            imageUrl : imageUrl,
            category : req.body.category,
            price : req.body.price
        }
        const updatedProduct = ProductModel.updateProduct(productId, updatedData);
        if(updatedProduct){
            return res.status(201).json(updatedProduct);
        }
        else {
            return res.status(404).send('Product not found!');
        }

    }

    //delete product
    deleteProduct(req,res){

        //stroing id 
        const productId = req.params.id;

        const isDeleted = ProductModel.deleteProduct(productId);//we get true/false from this method

        if(isDeleted){
            const products = ProductModel.getAllProducts();
            return res.status(201).json(products);
        }
        else{
            return res.status(404).send("no product found");
        }
    }
}