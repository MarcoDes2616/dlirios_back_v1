const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Category;