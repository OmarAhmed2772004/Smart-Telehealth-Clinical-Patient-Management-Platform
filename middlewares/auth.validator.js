const { body } = require("express-validator");

/**
 * Validation rules for POST /auth/register
 */
const registerValidator = [
    body("fullName")
        .notEmpty()
        .withMessage("Full name is required")
        .isString()
        .withMessage("Full name must be a string")
        .trim(),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("role")
        .optional()
        .isIn(["admin", "doctor", "patient"])
        .withMessage("Role must be one of: admin, doctor, patient"),
];

/**
 * Validation rules for POST /auth/login
 */
const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),
];

module.exports = { registerValidator, loginValidator };
