const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  logoutUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} = require("../controller/user.controller");

router.get("/get/:id", getUser);
router.get("/getAll", auth, getUsers);
router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.post("/login", loginUser);
router.post("/logout", auth, logoutUser);
module.exports = router;
