import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoute.js"
// import path from 'path'
import cookieParser from "cookie-parser";
import morgan from 'morgan'

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });

const app = express();
app.use(express.json());

app.use(cookieParser())
app.use(morgan('dev'))

app.listen(3000, () => {
  console.log("Server is running on port  3000!");
});

app.get('/api/',(req,res) => {
  res.json({message: 'api is working'})
})

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
// app.get("/api/admin", (req,res) => {
//   console.log('hello admin')
// });


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Servr Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
