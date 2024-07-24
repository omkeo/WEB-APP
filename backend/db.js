import mongoose from "mongoose"

const connectDB = async () => {
    try {
        
       const dbConnection= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DBNAME}`)
       if (dbConnection.connection) {
        console.log(`\n MongoDB connected !! DB HOST: ${dbConnection.connection.host}`);
        
       } 
            
 
        const db = mongoose.connection; 
        db.once('open', () => console.log('Connected to MongoDB'));

    } catch (error) {
        console.log("MONGODB connection FAILED @@@@@@@@@@ ", error); 
        process.exit(1)
    }  
}

export default connectDB