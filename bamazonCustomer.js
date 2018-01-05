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
})

function displayItems (){
    
}