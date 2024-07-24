import { cloudinary } from '../app.js';
import { Product } from '../models/Product.model.js'
import loginController from './login.controller.js';






const createProduct = async (req, res) => {
    try {
        const { name, price, categoryId } = req.body;
        const cat = await Product.findOne({ name })
        if (cat) {
            return res.status(202).json({ message: "Product already exists" })
        } else {
            await cloudinary.uploader.upload(req.file.path, async function (err, result) {

                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result)
                }
                const image = `${result['secure_url']}`

                const product = new Product({ name, price, image, categoryId });

                await product.save();

                res.status(201).json(product);
            })
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}






const AllProductList = async (req, res) => {
    try {
        const product = await Product.find().populate('categoryId');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}







const updateproduct = async (req, res) => {
     

    try {
        const { id } = req.params;
        const { name, price } = req.body;
        let { image } = req.body;
         


        const product = await Product.findById(id);
        
        if (product) {
             

            if (typeof image != 'string') {
                 


                await cloudinary.uploader.upload(req.file.path, async function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(result)
                    }
                     

                    image = `${result['secure_url']}`;
                });


            } else if (typeof image === 'string' && image === product.image) {

                image = product.image;
                 
            }


            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, price, image },
                { new: true }
            );
             
            res.status(200).json(updatedProduct);
             



        } else {
            res.status(404).json({ message: "Product not found" });
        }

    } catch (err) {
        res.status(500).send(err);
    }

}






const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ message: "Product deleted" });
        }
    } catch (err) {
        res.status(500).send(err);
    }

}

export { createProduct, AllProductList, updateproduct, deleteProduct }



