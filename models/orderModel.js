// interface Order {
//     id: string;
//     itemId: string;
//     quantity: number;
//   }

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
