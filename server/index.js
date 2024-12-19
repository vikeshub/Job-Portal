import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config(); // Load environment variables

const app = express();

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true, // Corrected typo
};
app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "client", "dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  connectDB(); // Ensure MongoDB connection is successful
  console.log(`Server is Running at http://localhost:${PORT}`);
});
