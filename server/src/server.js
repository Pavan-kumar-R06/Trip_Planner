require("dotenv").config();
const app = require("./app");
const connectDB = require("./utils/db");

const PORT = process.env.PORT || 5000;

async function startLocalServer() {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Then start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start local server:", err);
    process.exit(1);
  }
}

startLocalServer();