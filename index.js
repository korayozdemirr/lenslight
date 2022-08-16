import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import photoRoute from "./routes/photoRoute.js";
import pageRoute from "./routes/pageRoute.js";
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

app.use("/", pageRoute);
app.use("/photos", photoRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
