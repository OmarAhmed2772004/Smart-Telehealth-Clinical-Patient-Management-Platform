require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

const userRoutes = require("./routes/user.routes");
const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const index = express();

// 1. Middlewares
index.use(express.json());
index.use(
    cors({
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// 2. Routes
index.use("/users", userRoutes);
index.use("/doctors", doctorRoutes);
index.use("/patients", patientRoutes);
index.use("/auth", authRoutes);
index.use("/appointments", appointmentRoutes);

// 3. DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// 4. Database Connection & Server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");

        const PORT = process.env.PORT || 4000;
        index.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

// 5. Global Error Handling Middleware (must be last)
index.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        data: null,
    });
});