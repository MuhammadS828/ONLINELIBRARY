const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.post("/admin/users", usersController.addUser);
router.delete("/admin/users/:id", usersController.deleteUser);
router.patch("/admin/users/:id", usersController.updateUser);
router.get("/admin/users", usersController.getAllUsers);
router.patch("/admin/users/:userId/block", usersController.banForUser);

module.exports = router;
