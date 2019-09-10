const Item = require("../models/itemModel");

exports.getAllItems = async (req, res, next) => {
  Item.find({}, (err, docs) => {
    console.log("docs: ", docs);
    res.status(200).json({
      status: "success",
      items: docs
    });
  });
};

//Expects an array of element(s). For example:
// [
//     {
//         "type": "cloth",
//         "color": "red",
//         "size": "S",
//         "stock": 15
//     }
// ]

// OR,
// [
//     {
//         "type": "cloth",
//         "color": "blue",
//         "size": "S",
//         "stock": 15
//     }, 
//     {
//         "type": "cloth",
//         "color": "red",
//         "size": "S",
//         "stock": 15
//     }
// ]

exports.createItem = async (req, res, next) => {
  let itemsIds = [];
  for (let element of req.body) {
    try {
      let doc = await Item.findOneAndUpdate(
        {
          type: element.type,
          color: element.color,
          size: element.size
        },
        {
          $inc: { stock: element.stock }
        },
        { upsert: true, new: true }
      );
      itemsIds.push(doc._id);
    } catch (error) {
      return res.status(201).json({
        success: false,
        message: "One (or more) items are invalid"
      });
    }
  }
  res.status(200).json({
    success: true,
    itemsIds: itemsIds
  });
};

exports.getItemById = (req, res, next) => {
  Item.findById(req.params.id, (err, doc) => {
    if (err) {
      res.status(201).json({
        success: false,
        message: "Item could not be found"
      });
    }
    res.status(200).json({
      status: "success",
      item: doc
    });
  });
};

exports.updateItemById = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.id,
    {
      stock: req.body.stock 
    },
    () => {
      res.status(200).json({
        success: true
      });
    }
  );
};

exports.deleteItemById = (req, res, next) => {
  Item.findByIdAndDelete(req.params.id, (error, item) => {
    if(!item){
        return res.status(201).json({
            success: false,
            message: "Item could not be found"
        })
    }
    res.status(200).json({
      success: true
    });
  });
};
