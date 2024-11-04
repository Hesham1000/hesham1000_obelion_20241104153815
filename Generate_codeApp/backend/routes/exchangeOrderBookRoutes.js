const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/exchangeOrderBookController');

router.get('/orders', getAllOrders);

router.post('/orders', createOrder);

router.put('/orders/:orderID', updateOrder);

router.delete('/orders/:orderID', deleteOrder);

module.exports = router;