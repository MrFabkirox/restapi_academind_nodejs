const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', OrdersController.orders_create_order);

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/'
        }
      });  
    })
    .catch(err => {
      res.status(500).json({
        message: "Error getting product ",
        orderId: req.params.orderId
      })
    });
});

router.patch('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
    res.status(200).json({
      message: `patched order id ${id}`
    });
});

router.delete('/:orderId', (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders/",
          body: { productId: "ID", quantity: "Number" }
        }
      })
    })
  const id = req.params.orderId;
  res.status(200).json({
    message: `delete id ${id}`
  });
});
  
module.exports = router;
