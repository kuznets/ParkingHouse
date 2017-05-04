'use strict';

module.exports = {
    up: function (queryInterface, Sequelize, done) {

        queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(function () {
                queryInterface.createTable('orders', {
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
                    userId: {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'users',
                            key: 'id'
                        }
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    }
                });
            }).then(function () {
                done();
            })
    },

    down: function (queryInterface, Sequelize, done) {
            queryInterface.dropTable('orders').then(function () {
                queryInterface.dropTable('users');
            }).then(function () {
                done();
            })
    }
};
