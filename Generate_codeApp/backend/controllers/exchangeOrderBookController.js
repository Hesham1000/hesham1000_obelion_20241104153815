const Sequelize = require('sequelize');
const ExchangeOrderBook = require('../models/ExchangeOrderBook');

const sequelize = new Sequelize('Generate_codeApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

const getAllOrders = async (req, res) => {
  try {
    const orders = await ExchangeOrderBook.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const createOrder = async (req, res) => {
  const { userID, orderType, quantity, price, status } = req.body;
  try {
    const newOrder = await ExchangeOrderBook.create({
      userID,
      orderType,
      quantity,
      price,
      status
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const updateOrder = async (req, res) => {
  const { orderID } = req.params;
  const { userID, orderType, quantity, price, status } = req.body;
  try {
    const order = await ExchangeOrderBook.findByPk(orderID);
    if (order) {
      order.userID = userID;
      order.orderType = orderType;
      order.quantity = quantity;
      order.price = price;
      order.status = status;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

const deleteOrder = async (req, res) => {
  const { orderID } = req.params;
  try {
    const order = await ExchangeOrderBook.findByPk(orderID);
    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder
};