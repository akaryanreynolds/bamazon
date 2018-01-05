var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host:"localhost",
    port:"8889",
    user:"root",
    password:"root",
    database:"bamazon_db"
})

connection.connect(function(err){
    console.log("Connectes as id: "+connection.threadId);
    displayItems();
})

function displayItems (){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(" - - - - - - - - - - - - - - - ");
            console.log("item #: " + res[i].item_id);
            console.log("item for sale: " + res[i].product_name);
            console.log("price of item: $" + res[i].price);
        }
        connection.end();
    });
}