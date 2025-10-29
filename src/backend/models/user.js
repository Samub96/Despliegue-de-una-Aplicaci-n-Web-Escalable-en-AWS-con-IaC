const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false }
    });

    User.prototype.verifyPassword = async function(password) {
        return await bcrypt.compare(password, this.passwordHash);
    };

    return User;
};
