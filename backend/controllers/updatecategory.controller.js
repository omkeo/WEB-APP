import { Category } from "../models/Category.model.js";

const updateCategoryController = async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    // console.log(id,name,status);
    try {
        const category = await Category.findOneAndUpdate({ _id: id }, { name, status }, {
            new: true
        });
        res.status(200).json(category);
         
    } catch (error) {
        console.log(error);
    }


}
export default updateCategoryController