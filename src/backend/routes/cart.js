const express = require('express');
const router = express.Router();
const { CartItem, Product } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware de autenticación
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

// Ver carrito
router.get('/', auth, async (req, res) => {
    const items = await CartItem.findAll({
        where: { userId: req.user.id },
        include: [Product]
    });
    res.json(items);
});

// Agregar al carrito
router.post('/add', auth, async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Producto no existe' });

    let item = await CartItem.findOne({ where: { userId: req.user.id, productId } });
    if (item) {
        item.quantity += Number(quantity);
        await item.save();
    } else {
        item = await CartItem.create({ userId: req.user.id, productId, quantity });
    }
    res.json(item);
});

// Eliminar del carrito
router.post('/remove', auth, async (req, res) => {
    const { id } = req.body;
    const item = await CartItem.findByPk(id);
    if (!item || item.userId !== req.user.id) return res.status(404).json({ error: 'No encontrado' });
    await item.destroy();
    res.json({ success: true });
});

module.exports = router;
