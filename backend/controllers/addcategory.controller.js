import { Category } from "../models/Category.model.js";

const addCategoryController = async (req, res) => {

    const { name, status } = req.body;
    
        const category = new Category({ name, status });
        const response = await category.save();

        if (response) {
            return res.status(200).json({ message: "Category added successfully", category });

        }
        else {
            return res.status(400).json({ message: "Category not added" });
        }

    


}
export default addCategoryController;

