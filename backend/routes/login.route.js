import loginController from '../controllers/login.controller.js';
import { Router } from 'express';

const router =  Router();


router.route('/').post(loginController) 
 

export default router
