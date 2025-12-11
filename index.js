import readline from "readline-sync";
import { searchStock } from "./function/searchStock.js";
import { filterStocksByPrice } from "./function/filterStocksByPrice.js";
import { operateOnStock } from "./function/OperateOnStock.js";

function showStocks(stocks) {
    for (let i = 0; i < stocks.length; i++) {
        console.log('');
        console.log('Name: ' + stocks[i].name);
        console.log('ID: ' + stocks[i].id);
        console.log('Price: ' + stocks[i].currentPrice);
        console.log('Available: ' + stocks[i].availableStocks);
        console.log('Category: ' + stocks[i].category);
    }
    console.log('');
}

function handleSearch() {
    const input = readline.question('Enter name or ID: ');
    const results = searchStock(input);
    if (results.length > 0) {
        showStocks(results);
    }
}

function handleFilter() {
    const input = readline.question('Enter price: ');
    const price = parseFloat(input);
    const answer = readline.question('Above? (yes/no): ');
    const above = answer === 'yes';
    const results = filterStocksByPrice(price, above);
    if (results.length > 0) {
        showStocks(results);
    }
}

function handleOperation() {
    const op = readline.question('Buy or sell? ');
    const input = readline.question('Enter name or ID: ');
    operateOnStock(op, input);
}

function showMenu() {
    console.log('');
    console.log('=== Stock Trading App ===');
    console.log('1. Search for a stock by name or id ');
    console.log('2. Show all stocks above or below a given price');
    console.log('3. Buy or sell a stock');
    console.log('4. Exit');
    console.log('');

    const choice = readline.question('Choose: ');

    if (choice === '1') {
        handleSearch();
        showMenu();
    } else if (choice === '2') {
        handleFilter();
        showMenu();
    } else if (choice === '3') {
        handleOperation();
        showMenu();
    } else if (choice === '4') {
        console.log('Bye');
    } else {
        console.log('Invalid');
        showMenu();
    }
}

showMenu();
