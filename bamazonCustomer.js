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
            console.log("\n");
            console.log("item #: " + res[i].item_id);
            console.log("item for sale: " + res[i].product_name);
            console.log("price of item: $" + res[i].price);
            console.log("-----------------------\n");
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
            console.log("\nCome back when you're ready to buy.\nGood Bye!\n")
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
            validate: function (value) {
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
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (n) {

        connection.query("SELECT * FROM products WHERE ?", { item_id: n.item_num }, function (err, data) {
            if (err) throw err;
            
            var productData = data[0];

            if (n.quantity <= productData.stock_quantity) {
                console.log("Buying items...\n");

                connection.query("UPDATE products SET stock_quantity = " + (productData.stock_quantity - n.quantity) + " WHERE item_id = " + n.item_num, function (err, data) {
                    if (err) throw err;
                    console.log("Your order has been placed! Your total charged to your account is $" + productData.price * n.quantity + "\nGoodbye");
                    console.log("-----------------------\n");
                    connection.end();
                })
            } else {
                console.log("\nNot enough product in stock. Returning to start.");
                console.log("-----------------------\n");
                buyItem();
            }
        })
    })
}