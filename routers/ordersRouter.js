const express = require("express");
const router = express.Router();
const ordersController = require("../controller/ordersController");

router
  .route("/orders")
  .get(ordersController.getAllOrders)
  .post(ordersController.createOrder);
  
router.route("/order/:id").get(ordersController.getOrderById);

module.exports = router;
