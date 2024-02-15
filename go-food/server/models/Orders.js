const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  email: { type: String, required: true }, // 邮箱地址
  order_data: { type: Array, required: true },
});

module.exports = mongoose.model("order", OrderSchema);
