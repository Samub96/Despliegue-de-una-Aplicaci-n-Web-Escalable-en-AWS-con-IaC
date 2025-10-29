require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, Product } = require('./models');

const app = express();
const PORT = process.env.PORT || 8080;

// CORS: permite peticiones desde el frontend (Live Server en VS Code)
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Cambia si tu Live Server usa otro puerto
    credentials: true
}));

app.use(bodyParser.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/checkout', require('./routes/checkout'));

// Ruta base
app.get('/', (req, res) => res.json({ message: 'Backend operativo ✅' }));

// Sincronizar base de datos y lanzar servidor
(async () => {
    try {
        await sequelize.sync();
        console.log('🗄️ Base de datos sincronizada.');

        const count = await Product.count();
        if (count === 0) {
            const seed = require('./seed/seedProducts');
            await seed();
            console.log('🌱 Productos iniciales insertados.');
        }

        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
    } catch (err) {
        console.error('❌ Error al iniciar el servidor:', err);
    }
})();
