// const app = require("./src/app");
// const connectDB = require("./src/utils/db");

// module.exports = async (req, res) => {
//   try {
//     await connectDB();
//     return app(req, res);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Database connection failed",
//       error: err.message,
//     });
//   }
// };


const app = require("./src/app");
const connectDB = require("./src/utils/db");

module.exports = async (req, res) => {
  try {
    // 1. Ensure the database connection is established or reused
    await connectDB();
    
    // 2. Hand off the request handling to your Express app configuration
    return app(req, res);
  } catch (err) {
    console.error("Vercel Serverless Function Error:", err);
    res.status(500).json({
      message: "Database connection failed",
      error: err.message,
    });
  }
};