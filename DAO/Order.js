'use strict';

module.exports = function (sequelize, Sequelize) {
    const Order = sequelize.define('orders', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        startDate: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        stopDate: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return Order;
}