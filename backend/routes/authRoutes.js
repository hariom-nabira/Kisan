const { Router } = require("express");
const { userLogin, userRegistration, refreshAccessToken } = require("../controller/userController");

const router = Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);

router.post("/refresh-token", refreshAccessToken);

module.exports = router;
