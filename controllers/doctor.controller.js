const { validationResult } = require("express-validator");
const Doctor = require("../models/doctor.model");

// ─── Local async wrapper ────────────────────────────────────────────────────
// Eliminates repetitive try/catch blocks across every handler.
// Caught errors are forwarded to Express's error-handling middleware.
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// ─── Shared validation check ─────────────────────────────────────────────────
// Reads express-validator results and short-circuits with a 400 if invalid.
const checkValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            message: errors.array()[0].msg,
            data: null,
        });
        return false;
    }
    return true;
};

// ─── Safe populate options ───────────────────────────────────────────────────
// Only expose non-sensitive user fields; never return password or internal flags.
const SAFE_USER_FIELDS = "fullName email";

// ─── Handlers ────────────────────────────────────────────────────────────────

// POST /api/doctors  — Create a new doctor profile
const createDoctor = asyncHandler(async (req, res) => {
    if (!checkValidation(req, res)) return;

    const doctor = await Doctor.create(req.body);

    res.status(201).json({
        success: true,
        message: "Doctor created successfully",
        data: doctor,
    });
});

// GET /api/doctors  — Retrieve all doctor profiles (safe populate)
const getAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find().populate("userId", SAFE_USER_FIELDS);

    res.status(200).json({
        success: true,
        message: "Doctors fetched successfully",
        data: doctors,
    });
});

// GET /api/doctors/:id  — Retrieve a single doctor profile by ID (safe populate)
const getDoctorById = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id).populate(
        "userId",
        SAFE_USER_FIELDS
    );

    if (!doctor) {
        return res.status(404).json({
            success: false,
            message: "Doctor not found",
            data: null,
        });
    }

    res.status(200).json({
        success: true,
        message: "Doctor fetched successfully",
        data: doctor,
    });
});

// PUT /api/doctors/:id  — Update an existing doctor profile
const updateDoctor = asyncHandler(async (req, res) => {
    if (!checkValidation(req, res)) return;

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!doctor) {
        return res.status(404).json({
            success: false,
            message: "Doctor not found",
            data: null,
        });
    }

    res.status(200).json({
        success: true,
        message: "Doctor updated successfully",
        data: doctor,
    });
});

// DELETE /api/doctors/:id  — Remove a doctor profile
const deleteDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
        return res.status(404).json({
            success: false,
            message: "Doctor not found",
            data: null,
        });
    }

    res.status(200).json({
        success: true,
        message: "Doctor deleted successfully",
        data: doctor,
    });
});

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};
