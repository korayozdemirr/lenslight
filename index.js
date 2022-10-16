import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import cookieParser from "cookie-parser";
import photoRoute from "./routes/photoRoute.js";
import pageRoute from "./routes/pageRoute.js";
import userRoute from "./routes/userRoutes.js";
dotenv.config();
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

app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
