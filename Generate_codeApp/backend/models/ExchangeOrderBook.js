const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('Generate_codeApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

class ExchangeOrderBook extends Model {
  static init(sequelize) {
    super.init({
      orderID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      orderType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'ExchangeOrderBook',
      tableName: 'exchange_order_book',
      timestamps: false
    });
  }
}

ExchangeOrderBook.init(sequelize);

module.exports = ExchangeOrderBook;