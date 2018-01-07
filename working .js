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


    inquirer.prompt([
        {
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
    ]).then(function (input) {

        var item = input.item_num;
        var quantity = input.quantity;
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;
            var productData = data[0];
            if (quantity <= productData.stock_quantity) {
                console.log('Congratulations, the product you requested is in stock! Placing order!');
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                connection.query(updateQueryStr, function (err, data) {
                    if (err) throw err;

                    console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                    console.log('Thank you for shopping with us!');
                    console.log("\n---------------------------------------------------------------------\n");

                    // End the database connection
                    connection.end();
                })
            } else {
                console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                console.log('Please modify your order.');
                console.log("\n---------------------------------------------------------------------\n");
            }

        }
                )
        // connection query end

})
    // this ends the .then function
}
// this ends the choosenItem Function








        // var queryStr = 'SELECT * FROM products WHERE ?';

        // connection.query(queryStr, { item_id: n.item }, function(err, data) {
        //     if (err) throw err;
        // })
        // console.log ('data = ' + JSON.stringify(data));

        // if (pickedItem.stock_quantity < n.quantity){
        //     console.log ("Insufficient quantity!")
        // }
        // if {
        //     console.log("Buying items...\n");
        //     connection.query(
        //         "UPDATE products SET stock_quantity = " + (stock_quantity - n.quantity) + "WHERE item_id = " + n.item_num,
        //         function (err, res) {
        //             if (err) throw err;
        //             console.log("Item purchased and quantity updated successfully!");
        //             console.log("Total amount spent $" + price * n.quantity);
        //             buyItem();
        //         });
        //     }
        // })

