const app = require("./src/app");
const connectDB = require("./src/utils/db");

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database connection failed",
      error: err.message,
    });
  }
};


