import express, { json } from 'express';
import porductRoutes from './src/features/product/product.routes.js';
import userRoutes from './src/features/user/user.routes.js';

const app = express()
const port = 3000

app.use(express.json());
//parsing the data
app.use(express.urlencoded({extended : true}));

app.use('/api/product',porductRoutes);

app.use('/api/user', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})