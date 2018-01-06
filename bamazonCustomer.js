var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connectes as id: " + connection.threadId);
    displayItems();
})

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(" - - - - - - - - - - - - - - - ");
            console.log("item #: " + res[i].item_id);
            console.log("item for sale: " + res[i].product_name);
            console.log("price of item: $" + res[i].price);
        }
        // connection.end();
        buyItem();
    });
}

function buyItem() {
    inquirer.prompt([{
        type: "list",
        name: "buy_item",
        message: "Would you like to buy and item?",
        choices: ["YES", "NO"]
    }
    ]).then(function (n) {
        if (n.buy_item === "YES") {
            chooseItem()
        }
        else if (n.buy_item === "NO") {
            connection.end();
        }
    })
}

function chooseItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_num",
            message: "What item # would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }
    ]).then(function (n) {
        console.log("Buying items...\n");
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: n.quantity
                },
                {
                    item_id: n.item_num
                }
            ],
            function(error) {
                if (error) throw err;
                console.log("Item purchased and quantity updated successfully!");
                buyItem();
            }
        )
    })
}