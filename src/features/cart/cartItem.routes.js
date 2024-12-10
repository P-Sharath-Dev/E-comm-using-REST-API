import express from 'express';
import CartItemController from './cartItem.controller.js';

//creating instance of cartItemController
const cartItemController = new CartItemController();

const router = express.Router();

// domainName.com/api/cart/
router.get('/', cartItemController.getAllCartItems);

// domainName.com/api/cart?productId=1&quantity=1   (req.query)
router.post('/', cartItemController.addCartItem);

// domainName.com/api/cart?productId=1&quantity=1   (req.params)
router.delete('/:id', cartItemController.deleteCartItem);

 export default router;