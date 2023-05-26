//console.log("PRAJWAL SAWANT");

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/users" , userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
//app.get("/api/test", ()=> {console.log("tested")});

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connection Is Succesfull")).catch((error) => console.log(error));
app.listen(process.env.PORT || 5000 , () => console.log("Server Connection Is Successfull"));