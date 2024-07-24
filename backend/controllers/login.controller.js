import { User } from "../models/User.model.js";

const loginController = async (req, res) => {
    const { email, password } = req.body;
     
    const user = await User.findOne({ email: email });




    if (user) {

        if (user.password === password) {
            res.status(200).json( {user} );


        } else {
            res.status(403).json({ message: "Incorrect Password." });
        }
    }
    else {
        res.status(401).json({ message: "User Not Found, Please register " });
    }

}
export default loginController;

