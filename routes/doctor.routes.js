const express = require("express");
const router = express.Router();

const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctor.controller");

const {
    createDoctorValidator,
    updateDoctorValidator,
} = require("../middlewares/doctor.validator");

// POST   /api/doctors          — Create a new doctor profile
router.post("/", createDoctorValidator, createDoctor);

// GET    /api/doctors          — Retrieve all doctor profiles
router.get("/", getAllDoctors);

// GET    /api/doctors/:id      — Retrieve a single doctor profile by ID
router.get("/:id", getDoctorById);

// PUT    /api/doctors/:id      — Update an existing doctor profile
router.put("/:id", updateDoctorValidator, updateDoctor);

// DELETE /api/doctors/:id      — Remove a doctor profile
router.delete("/:id", deleteDoctor);

module.exports = router;
