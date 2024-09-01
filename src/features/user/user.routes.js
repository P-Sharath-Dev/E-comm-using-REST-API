import express from 'express';
import UserController from './user.controller.js';

//creating instance of UserController
const userController = new UserController();

const router = express.Router();

// domainName.com/api/user/login   (req.body)
router.post('/login',userController.login);

// domainName.com/api/user/signup   (req.body)
router.post('/signup', userController.signup);


export default router;