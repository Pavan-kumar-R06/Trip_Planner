const express = require("express");
const cors = require("cors");
const destinationsRouter = require("./routes/destinations");
const plannerRouter = require("./routes/planner");
const tripsRouter = require("./routes/trips");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://trip-planner-git-main-pavankumar060905-8109s-projects.vercel.app",
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Trip Planner API is running successfully!",
    status: "healthy"
  });
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/destinations", destinationsRouter);
app.use("/api/planner", plannerRouter);
app.use("/api/trips", tripsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
