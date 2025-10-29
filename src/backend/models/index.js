const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');
const CartItem = require('./cartItem');
const Order = require('./order');

const models = {
    User: User(sequelize),
    Product: Product(sequelize),
    CartItem: CartItem(sequelize),
    Order: Order(sequelize)
};

// Relaciones
models.User.hasMany(models.CartItem, { foreignKey: 'userId' });
models.CartItem.belongsTo(models.User, { foreignKey: 'userId' });

models.Product.hasMany(models.CartItem, { foreignKey: 'productId' });
models.CartItem.belongsTo(models.Product, { foreignKey: 'productId' });

models.User.hasMany(models.Order, { foreignKey: 'userId' });
models.Order.belongsTo(models.User, { foreignKey: 'userId' });

module.exports = { sequelize, ...models };
