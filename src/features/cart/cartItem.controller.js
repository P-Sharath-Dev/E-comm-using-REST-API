import { urlencoded } from "express";
import CartItemModel from "./cartItem.model.js";

export default class CartItemController{
    addCartItem(req, res){
        const {productId, quantity} = req.query;
        if(!productId || !quantity){
            return res.status(400).send("bad request")
        }
        const userId = req.userId;
        CartItemModel.addToCart(userId, productId, quantity);;
        return res.status(201).send("Product added to cart")
    }

    getAllCartItems(req, res){
        const userId = req.userId;
        const cartItems = CartItemModel.getCart(userId);
        return res.status(200).send(cartItems)
    }
    deleteCartItem(req, res){
        const userId = req.userId;
        const {id : cartItemId} = req.params;
        const error = CartItemModel.deleteCartItem(cartItemId, userId);
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send('product removed from cart');
    }
}