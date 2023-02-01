const { sequelize } = require('../db/connect')
const { Sequelize, DataTypes } = require('sequelize');

const Users = sequelize.define('Users', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING,
    },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {});

module.exports = { Users }