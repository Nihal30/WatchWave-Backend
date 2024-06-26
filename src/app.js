import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// to accept json from front-end
app.use(express.json({ limit: "10kb" }));

// to accept headers data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// to store public data like ,files,pdf
app.use(express.static("public"))

// to perform crud in cookies
app.use(cookieParser())

// routes import 

import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/user",userRouter) // eg http//localhost:8000/api/v1/user/register


export default app;
