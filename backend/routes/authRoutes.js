const { Router } = require("express");
const { userLogin, userRegistration, userLogout } = require("../controller/userController");

const router = Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/logout", userLogout);

module.exports = router;
