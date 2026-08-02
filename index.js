
const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");

const userRoutes = require("./routes/user.routes");
const doctorRoutes = require("./routes/doctor.routes");

const index = express();

index.use(express.json());


dns.setServers(["8.8.8.8", "8.8.4.4"]);

mongoose.connect(
    "mongodb+srv://lujainahmed459_db_user:eSwQu9jFNC9DcuS8@cluster0.whlhfwe.mongodb.net/telehealth?retryWrites=true&w=majority&appName=Cluster0"
)
    .then(() => {
        console.log("Connected to MongoDB");

        index.use("/users", userRoutes);
        index.use("/doctors", doctorRoutes);

        index.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => console.log(err));















