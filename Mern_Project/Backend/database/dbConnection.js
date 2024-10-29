import mongoose from "mongoose";

// export const dbConnection = ()=>{
//     mongoose
//         .connect(process.env.MONGO_URI,{
//             dbName: "RESTAURANT",
//         })
//         .then(()=>{
//             console.log("Connected to database is Successful");
//         })
//         .catch((err)=>{
//             console.log(`Some error occured while connecting to Database! ${err}`);
//         });
// };

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "RESTAURANT",
        });
        console.log("Connected to database successfully");
    } catch (err) {
        console.error(`Error connecting to the database: ${err.message}`);
        throw err; // Or handle it with your error middleware
    }
};
