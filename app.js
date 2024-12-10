import express, { json } from 'express';
import porductRoutes from './src/features/product/product.routes.js';
import userRoutes from './src/features/user/user.routes.js';
import cartRoutes from './src/features/cart/cartItem.routes.js'
//import basicAuth from './src/middlewares/user/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/user/jwt.middleware.js';

const app = express()
const port = 3000

app.use(express.json());

//parsing the data
app.use(express.urlencoded({extended : true}));

//app.use('/api/product',basicAuth, porductRoutes);
app.use('/api/product',jwtAuth, porductRoutes);

app.use('/api/cart', jwtAuth, cartRoutes);

app.use('/api/user', userRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})