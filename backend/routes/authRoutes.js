const { Router } = require("express");
const { userLogin, userRegistration, userLogout, refreshAccessToken } = require("../controller/userController");

const router = Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/logout", userLogout);

router.post("/refresh-token", refreshAccessToken);

module.exports = router;
