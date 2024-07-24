 import { Router } from 'express';
import  { AllProductList,createProduct, deleteProduct, updateproduct } from '../controllers/product.controller.js';
 


const router =  Router();

const createRouter = (upload) => {
    router.post('/addproduct',  upload.single('image'), createProduct);
    router.put('/updateproduct/:id',  upload.single('image'), updateproduct);
    router.get('/allproducts', AllProductList);
    router.delete('/deleteproduct/:id', deleteProduct);
     
    return router;
  };
  
  export default createRouter;




 

 
