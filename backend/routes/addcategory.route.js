import addCategoryController from '../controllers/addcategory.controller.js';
import { Router } from 'express';

const router =  Router();


router.route('/').post(addCategoryController) 
 

export default router
