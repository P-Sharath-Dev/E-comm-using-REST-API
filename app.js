import express, { json } from 'express';
import porductRoutes from './src/features/product/product.routes.js';
import fileUpload from './src/middlewares/product/fileUpload.middleware.js';

const app = express()
const port = 3000

app.use(express.json());
//parsing the data
app.use(express.urlencoded({extended : true}));

app.use('/api/product',porductRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})