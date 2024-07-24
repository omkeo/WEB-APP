import { Category } from "../models/Category.model.js";

const findCategoryNameController = async (req, res) => {
    
    const { name } = req.body;
    
    try {
        
        const category = await Category.findOne({name} );
         
        if (category){
            return res.status(201).json({
                
                message: "Category found"
            });
        } else{
           
            return res.status(200).json({
                message: "Category not found"
                
                });
                
        }

    }catch{
        
        res.status(500).json({
            message: "Internal server error"
            });
    }
}
export default findCategoryNameController;

