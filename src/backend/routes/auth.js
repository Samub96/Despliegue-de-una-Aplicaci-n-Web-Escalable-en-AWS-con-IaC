const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Registro
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'Faltan datos' });

        const existing = await User.findOne({ where: { username } });
        if (existing) return res.status(400).json({ error: 'Usuario ya existe' });

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, passwordHash: hash });
        res.json({ id: user.id, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

        const valid = await user.verifyPassword(password);
        if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, username }, JWT_SECRET, { expiresIn: '12h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;
