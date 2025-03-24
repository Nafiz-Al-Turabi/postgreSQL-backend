const Order = require("../model/Order");

const createOrder = async (req, res) => {
  const { user_id, product_name, quantity, totalAmount } = req.body;
  try {
    const order = await Order.createOrder(
      user_id,
      product_name,
      quantity,
      totalAmount
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const orders = await Order.getOrdersByUserId(user_id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrdersByUserId,
};
