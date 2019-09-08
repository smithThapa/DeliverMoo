const express = require("express");
const router = express.Router();
const itemsController = require("../controller/itemsController");
const authController = require("../controller/authController");

router
  .route("/items")
  .get(itemsController.getAllItems)
  .post(authController.authenticate, itemsController.createItem);
router
  .route("/item/:id")
  .get(itemsController.getItemById)
  .patch(authController.authenticate, itemsController.updateItemById)
  .delete(itemsController.deleteItemById);

module.exports = router;
