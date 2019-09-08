// interface Item {
//     id: string;
//     type: string;
//     color: string;
//     size: "S" | "M" | "L";
//     stock: number;
//   }

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  color: String,
  size: {
    type: String,
    enum: ["S", "M", "L"],
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
