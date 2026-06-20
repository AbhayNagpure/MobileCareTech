import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import chatRouter from "./routes/chat.route.js";

const app = express();

const allowedOrigins = [
    process.env.CORS_ORIGIN,
    "https://mobilecaretech.in",
    "https://www.mobilecaretech.in",
    "http://localhost:5173"
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true, limit: "5mb"}));

app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/chat", chatRouter);

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "MobileCareTech API is running perfectly!" });
});

app.use(errorHandler);

export {app};
