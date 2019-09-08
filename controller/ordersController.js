const Order = require("../models/orderModel");
const Item = require("../models/itemModel");

exports.getAllOrders = async (req, res, next) => {
  Order.find({}, (err, docs) => {
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs
      }
    });
  });
};

exports.createOrder = async (req, res, next) => {
  if (req.body.itemId && req.body.quantity) {
    Item.findById(req.body.itemId, async (err, item) => {
      if (err) {
        return res.status(201).json({
          success: false,
          message: "Item could not be found"
        });
      }

      if (item.stock < req.body.quantity) {
        return res.status(201).json({
          success: false,
          message: "Item does not have enough stock"
        });
      }

      const doc = await Order.create(req.body);

      Item.findByIdAndUpdate(item._id, {
        stock: item.stock - req.body.quantity
      }, (err) => {
        if{
          console.log("Cannot update item", err);
        }
        
      });

      res.status(200).json({
        success: true,
        order: doc
      });
    });
  } else {
    res.status(201).json({
      success: false,
      message: "Invalid request"
    });
  }
};

exports.getOrderById = async (req, res, next) => {
  Order.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.status(201).json({
        success: false,
        message: "Order could not be found"
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });
};
