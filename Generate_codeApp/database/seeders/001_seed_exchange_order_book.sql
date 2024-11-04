module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('exchange_order_book', [
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('exchange_order_book', null, {})
};
