// import ErrorHandler from "../error/error.js";
// import {Reservation} from "../models/reservationSchema.js";

// export const sendReservation = async(req, res, next )=> {
//     const { firstName, lastName, email, phone, date ,time} = req.body;
//     if (!firstName || !lastName || !email || !phone || !date || !time) {
//             return next(new ErrorHandler("Please fill full reservation form!", 400));
//     }
//     try{
//         await Reservation.create({ firstName, lastName, email, phone, date, time });
//         res.status(200).
//             json({
//                 success: true,
//                 message: "Reservation sent Succesfully!",
//             });
//     }catch (error){
//         if (error.name == "ValidationError"){
//             const validationErrors = Object.values(error.errors).map((err) => err.message);
//             return next(new ErrorHandler(validationErrors.join(" , "), 400));
//         }
//         return next(error);
//     }
// };
import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;

    const missingFields = [];

    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!date) missingFields.push("date");
    if (!time) missingFields.push("time");

    // If there are missing fields, return an error
    if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Please fill the following fields: ${missingFields.join(", ")}`
        });
    }

    try {
        await Reservation.create({ firstName, lastName, email, phone, date, time });
        return res.status(200).json({
            success: true,
            message: "Reservation sent successfully!"
        });
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: validationErrors.join(", ")
            });
        }

        // Log unexpected errors to the terminal
        console.error("Unexpected Error:", error);
        
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};
