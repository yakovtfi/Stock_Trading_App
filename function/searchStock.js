import { stockMarket } from "../Data/Data.js";

export function searchStock(identifier) {
    const results = stockMarket.stocks.filter(stock =>
        stock.name === identifier || stock.id === identifier
    );

    if (results.length === 0) {
        console.log(`No stocks found matching "${identifier}"`);
        return [];
    }

    return results;
}