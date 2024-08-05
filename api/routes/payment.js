const express = require("express");
const router = express.Router();
const { Add } = require('../controllers/payment'); // Correct path according to your project structure

router.post("/payment", Add);

module.exports = router;
