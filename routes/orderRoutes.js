const express = require("express");
const { createOrder, getOrdersByUserId } = require("../controller/orderController");
const router = express.Router();

router.post("/", createOrder);
router.get("/:user_id", getOrdersByUserId);

module.exports = router;
