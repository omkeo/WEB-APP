import { Category } from "../models/Category.model.js";

const allCategoryController = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.json({ message: error });
    }

}


const deleteCategoryController = async (req, res) => {
    
    try {
        const { id } = req.params;
    
        const category = await Category.findByIdAndDelete(id);
        if (category) {
            res.status(200).json(category);
        }
       
        
       

    } catch (error) {
      
        res.json({ message: error });
    }



}
export { allCategoryController, deleteCategoryController };

