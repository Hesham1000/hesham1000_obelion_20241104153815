CREATE TABLE exchange_order_book (
  orderID INT AUTO_INCREMENT PRIMARY KEY,
  userID INT NOT NULL,
  orderType VARCHAR(255) NOT NULL,
  quantity FLOAT NOT NULL,
  price FLOAT NOT NULL,
  status VARCHAR(255) NOT NULL
);
