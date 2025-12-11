import { stockMarket } from "../Data/Data.js";

export function filterStocksByPrice(givenPrice, above) {
    if (typeof givenPrice !== 'number' || isNaN(givenPrice)) {
        console.log('Error: Price must be a valid number');
        return [];
    }

    const results = stockMarket.stocks.filter(stock =>
        above ? stock.currentPrice > givenPrice : stock.currentPrice < givenPrice
    );

    if (results.length === 0) {
        console.log(`No stocks found ${above ? 'above' : 'below'} $${givenPrice}`);
        return [];
    }

    return results;
}


