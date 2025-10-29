const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Order', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        itemsJson: { type: DataTypes.TEXT, allowNull: false },
        total: { type: DataTypes.FLOAT, allowNull: false },
        status: { type: DataTypes.STRING, defaultValue: 'paid' }
    });
};
