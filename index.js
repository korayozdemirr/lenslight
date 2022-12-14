import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import cookieParser from "cookie-parser";
import photoRoute from "./routes/photoRoute.js";
import pageRoute from "./routes/pageRoute.js";
import userRoute from "./routes/userRoutes.js";
import { checkUser } from "./middlewares/authMiddleware.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
//db connection
conn();
const app = express();
const port = process.env.PORT || 8080;
//ejs template engine
app.set("view engine", "ejs");

//static files middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

app.use("*", checkUser);
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
