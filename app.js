import express, { json } from 'express';
import porductRoutes from './src/features/product/product.routes.js';
import userRoutes from './src/features/user/user.routes.js';
import cartRoutes from './src/features/cart/cartItem.routes.js'
//import basicAuth from './src/middlewares/user/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/user/jwt.middleware.js';
import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './swagger.json' assert {type : "json"};
import swaggerDocument from './swagger3.json' assert {type : "json"};
import cors from "cors";

const app = express()
const port = 3000

//CORS library/package
const corsOptions = {
  origin : 'http://127.0.0.1:5500',
  optionSuccessStatus : 200
}
app.use(cors());

app.use(express.json());

//parsing the data
app.use(express.urlencoded({extended : true}));

//handle CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Orign', "http://127.0.0.1:5500");
//   res.header('Access-Control-Allow-Headers', "http://127.0.0.1:5500");
//   res.header('Access-Control-Allow-Methods', "http://127.0.0.1:5500");
//   if (req.method == "OPTIONS") {
//     res.sendStatus(200);
//   }
//   next();
// })


//swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//app.use('/api/product',basicAuth, porductRoutes);
app.use('/api/product',jwtAuth, porductRoutes);

app.use('/api/cart', jwtAuth, cartRoutes);

app.use('/api/user', userRoutes);

app.get('/', (req, res)=>{
  res.send("hello from rest api");
});

//send error message if user provided route does'nt match  with the available routes
app.use((req, res)=> {
  res.status(404).send("Page Not Found, check our API docs here : localhost:3000/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})