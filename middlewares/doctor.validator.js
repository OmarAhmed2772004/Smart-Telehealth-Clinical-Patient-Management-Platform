const { body } = require("express-validator");

/**
 * Validation rules for POST /doctors (Create)
 * - userId   : REQUIRED  — must be a valid MongoDB ObjectId
 * - specialization : REQUIRED — must be a non-empty string
 * - bio      : OPTIONAL  — if provided, must be a string
 */
const createDoctorValidator = [
    body("userId")
        .notEmpty()
        .withMessage("userId is required")
        .isMongoId()
        .withMessage("userId must be a valid MongoDB ObjectId"),

    body("specialization")
        .notEmpty()
        .withMessage("specialization is required")
        .isString()
        .withMessage("specialization must be a string")
        .trim(),

    body("bio")
        .optional()
        .isString()
        .withMessage("bio must be a string")
        .trim(),
];

/**
 * Validation rules for PUT /doctors/:id (Update)
 * - userId   : OMITTED   — must not be changed after creation
 * - specialization : OPTIONAL — if provided, must be a non-empty string
 * - bio      : OPTIONAL  — if provided, must be a string
 */
const updateDoctorValidator = [
    body("userId")
        .not()
        .exists()
        .withMessage("userId cannot be modified after creation"),

    body("specialization")
        .optional()
        .notEmpty()
        .withMessage("specialization cannot be empty")
        .isString()
        .withMessage("specialization must be a string")
        .trim(),

    body("bio")
        .optional()
        .isString()
        .withMessage("bio must be a string")
        .trim(),
];

module.exports = { createDoctorValidator, updateDoctorValidator };
