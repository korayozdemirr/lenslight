import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "lentlight",
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to db succesfully");
    })
    .catch((err) => {
      console.log(`DB connection err:${err}`);
    });
};

export default conn;
