import express from 'express';
import ProductController from './product.controller.js';
import fileUpload from '../../middlewares/product/fileUpload.middleware.js';

//creating instance of productController
const productController = new ProductController();

const router = express.Router();

//filtering products (req.query)
// domainName.com/api/product/filter?name=value&anotherName=value2
router.get('/filter', productController.getFilteredProducts);

// domainName.com/api/product/
router.get('/', productController.getAllProducts);

// domainName.com/api/product/   (req.body)
router.post('/',fileUpload.single('imageUrl'), productController.addProduct);

// domainName.com/api/product/id  (req.params)
router.get('/:id', productController.getProductById);


//home work
// domainName.com/api/product/id
router.put('/:id',fileUpload.single('imageUrl'), productController.updateProduct);

// domainName.com/api/product/id
router.delete('/:id', productController.deleteProduct);


export default router;