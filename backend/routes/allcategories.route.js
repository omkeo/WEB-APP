import { deleteCategoryController ,allCategoryController} from '../controllers/allcategories.controller.js';
import { Router } from 'express';
import findCategoryNameController from '../controllers/nameCategory.Controller.js';
import updateCategoryController from '../controllers/updatecategory.controller.js';

const router =  Router();


router.route('/').get(allCategoryController) 
router.route('/getbyname').post(findCategoryNameController)
router.route('/deletecategory/:id').delete(deleteCategoryController) 
router.route('/updatecategory/:id').put(updateCategoryController) 


 

export default router
