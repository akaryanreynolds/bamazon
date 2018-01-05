CREATE DATABASE bamazon_db;
CREATE TABLE products
(
    item_id INTEGER (10)
    AUTO_INCREMENT NOT NULL,
	product_name VARCHAR
    (30) NOT NULL,
	department_name VARCHAR
    (30) NOT NULL,
	price INTEGER
    (10) NOT NULL,
	stock_quantity INTEGER
    (10) NOT NULL,
	PRIMARY KEY
    (item_id)
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Motorcycle", "Automotive", 6000, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Tires", "Parts", 300, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Oil", "Fluids", 10, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Grips", "Parts", 20, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Brakes", "Parts", 60, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Cables", "Parts", 40, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Lights", "Parts", 160, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Stickers", "Parts", 50, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Cowel", "Parts", 260, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Exhaust", "Parts", 460, 10);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Wind Screen", "Parts", 130, 10);
