// class ErrorHandler extends Error{
//     constructor(message, statusCode){
//         super(message);
//         this.statusCode =statusCode;
//     }
// }

// export const errorMiddleware = (err, req, res, next) => {
//     err.messsage = err.message || "Internal Server Error!";
//     err.statusCode = err.statusCode || 500;

//     return res.status(err.statusCode).json({
//         success: false,
//         message: err.message,
//     });
// };

// export default ErrorHandler;
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Capture the stack trace for debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorMiddleware = (err, req, res, next) => {
    // Ensure that error properties exist
    err.message = err.message || "Internal Server Error!";
    err.statusCode = err.statusCode || 500;

    // Log the error for debugging (optional)
    console.error("Error:", err);

    // Return the error response
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;
