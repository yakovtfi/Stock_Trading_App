import { stockMarket } from "../Data/Data.js";
import readline from "readline-sync";

function updatePrice(stock, newPrice) {
    stock.previousPrices.push(stock.currentPrice);
    stock.currentPrice = Math.round(newPrice * 100) / 100;
    stockMarket.lastUpdated = new Date();
}

function updateCategory(selectedStock, increase) {
    for (let i = 0; i < stockMarket.stocks.length; i++) {
        const stock = stockMarket.stocks[i];
        if (stock.category === selectedStock.category && stock.id !== selectedStock.id) {
            let price = stock.currentPrice;
            if (increase === true) {
                price = price * 1.01;
            } else {
                price = price * 0.99;
            }
            updatePrice(stock, price);
        }
    }
}

function findStock(identifier) {
    for (let i = 0; i < stockMarket.stocks.length; i++) {
        const stock = stockMarket.stocks[i];
        if (stock.name === identifier || stock.id === identifier) {
            return stock;
        }
    }
    return null;
}

export function operateOnStock(operation, identifier) {
    if (operation !== 'buy' && operation !== 'sell') {
        console.log('Invalid');
        return;
    }

    const stock = findStock(identifier);
    if (stock === null) {
        console.log('Not found');
        return;
    }

    const answer = readline.question('How many? ');
    const units = parseInt(answer);
    if (isNaN(units) || units <= 0) {
        console.log('Invalid');
        return;
    }

    if (operation === 'buy') {
        stock.availableStocks = stock.availableStocks - units;
        console.log('Bought ' + units + ' units');
        const price = stock.currentPrice * 1.05
        updatePrice(stock, price);
        console.log('New price: ' + stock.currentPrice);
        updateCategory(stock, true);
    } else {
        stock.availableStocks = stock.availableStocks + units;
        console.log('Sold ' + units + ' units');
        const price = stock.currentPrice * 0.95;
        updatePrice(stock, price);
        console.log('New price: ' + stock.currentPrice);
        updateCategory(stock, false);
    }

    console.log('Available: ' + stock.availableStocks);
}