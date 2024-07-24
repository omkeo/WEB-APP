import  express from 'express'
import session from 'express-session'
import cors from "cors"
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv'
import multer from 'multer'
import  {v2 as cloudinary}  from 'cloudinary'   

import loginRoute from './routes/login.route.js'
import addCategoryRoute from './routes/addcategory.route.js';
import allCategoryRoute from './routes/allcategories.route.js'
import productRoutes from './routes/product.route.js'

dotenv.config();
const app=express();    
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());   
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true, 
}));
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    }
     
  });
  
  const upload = multer({ storage: storage })  
   
 
  
app.use('/login', loginRoute);   
app.use('/addcategory', addCategoryRoute); 
app.use('/categories', allCategoryRoute); 
 
app.use('/products', productRoutes(upload)); 
  

 

 
 
 
 
 


export {app,upload,cloudinary} 