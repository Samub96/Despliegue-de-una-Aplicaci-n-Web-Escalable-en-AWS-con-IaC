const express = require('express');
const router = express.Router();
const { CartItem, Product, Order } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'no auth header' });
    try {
        const token = header.split(' ')[1];
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'invalid token' });
    }
}

router.post('/process', auth, async (req, res) => {
    const items = await CartItem.findAll({ where: { userId: req.user.id }, include: [Product] });
    if (items.length === 0) return res.status(400).json({ error: 'Carrito vacío' });

    const summary = items.map(i => ({
        productId: i.Product.id,
        name: i.Product.name,
        quantity: i.quantity,
        price: i.Product.price,
        total: i.Product.price * i.quantity
    }));

    const total = summary.reduce((sum, i) => sum + i.total, 0);

    const order = await Order.create({
        userId: req.user.id,
        itemsJson: JSON.stringify(summary),
        total,
        status: 'paid'
    });

    await CartItem.destroy({ where: { userId: req.user.id } });

    res.json({ success: true, orderId: order.id, total });
});

module.exports = router;
