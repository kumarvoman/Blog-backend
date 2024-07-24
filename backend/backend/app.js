import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogrouter from "./routes/blog-routes.js";

const app = express();

app.use(express.json()); //middleware to parse the incoming request with JSON payloads

app.use("/api/user", router); //middleware to use the user routes
app.use("/api/blog", blogrouter); //middleware to use the blog routes

mongoose
    .connect(
        "mongodb+srv://vkivanti:doaurdo4@cluster0.bm9jx5c.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() =>app.listen(3000))
    .then(() => 
        console.log("Connected to database and listening to localhost:3000")
    )
    .catch((err) => console.log(err));

//below data is to send this hello world message to the browser
/*app.use("/api", (req, res, next) => {
    res.send("Hello World");    
});*/

//app.listen(3000);