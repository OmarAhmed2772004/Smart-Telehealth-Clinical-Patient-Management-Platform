const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");

const userRoutes = require("./routes/user.routes");
const doctorRoutes = require("./routes/doctor.routes");

const index = express();

// 1. Middlewares
index.use(express.json());

// 2. Routes
index.use("/users", userRoutes);
index.use("/doctors", doctorRoutes);

// 3. DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// 4. Database Connection & Server
const MONGO_URI = "mongodb+srv://lujainahmed459_db_user:eSwQu9jFNC9DcuS8@cluster0.whlhfwe.mongodb.net/telehealth?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");

        index.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => console.error("Database connection error:", err));