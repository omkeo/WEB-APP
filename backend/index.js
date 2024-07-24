import {app} from "./app.js";
import connectDB from "./db.js";

 connectDB()

app.listen(process.env.PORT || 8000, () => {   
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);     
}) 