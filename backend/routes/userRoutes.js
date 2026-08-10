const express = require("express");
const router = express.Router();

const {
    registerUser,
    createAdmin,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");


// ==========================================
// Register User
// ==========================================
router.post("/", registerUser);


// ==========================================
// Create New Admin
// Only existing Admin can do this
// ==========================================
router.post(
    "/create-admin",
    protect,
    authorize("admin"),
    createAdmin
);


// ==========================================
// Get All Users
// Only Admin
// ==========================================
router.get(
    "/",
    protect,
    authorize("admin"),
    getUsers
);


// ==========================================
// Get User By ID
// Only Admin
// ==========================================
router.get(
    "/:id",
    protect,
    authorize("admin"),
    getUserById
);


// ==========================================
// Update User
// Only Admin
// ==========================================
router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateUser
);


// ==========================================
// Delete User
// Only Admin
// ==========================================
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteUser
);


module.exports = router;