// Senen Bagos
// This Class handles making new buy/sell accounts managing your currency, profit/loss dividends xyz
// A user can have multiple to test out different trading tactics
import { Stock } from "./Stock";
import { getCurrentPrice } from "./stockPrice";

export class Session {
    private _id: string;
    private _balance: number;
    _profitLoss: number;
    public _stocks: Map<string, Stock>;

    // TODO bought at date (maybe)
    constructor(id: string, balance: number) {
        this._id = id;
        this._balance = balance
        this._profitLoss = 0;
        this._stocks = new Map<string, Stock>;
    }
    //quanity = 1 by default somehow
    public async buyStock(ticker: string, quantity: number = 1 ): Promise<void>{
        if(quantity <= 0){
            console.log("You cant buy 0 or negative stock")
            return;
        }
        // v  might remove this but it works 
        const { price } = await getCurrentPrice(ticker); //price is from the quote json thingy this method returns
        const totalValue = price * quantity;

        if(totalValue > this._balance){ 
            console.log("You cant afford it");

        } else if (this._stocks.has(ticker)){ //if stock is already in users account add to it 
            const stock = this._stocks.get(ticker)!;
            stock.addToInitialTotalValue(totalValue);
            stock.addQuantity(quantity);
            
        } else { //buy and set the stock to the hashmap
            const stock = await Stock.create(ticker, quantity);   
            stock.addToInitialTotalValue(totalValue)         
            this._stocks.set(ticker, stock); // sets hashmap with stock ("AAPL", aapl object)
        }
        this._balance -= totalValue;
        console.log(`Bought ${quantity} shares of ${ticker} at $${price} each.`);
    }

    public async sellStock(ticker: string, quantity: number): Promise<void> {
        if (!this._stocks.has(ticker)) {
            console.log(`You don't own any shares of ${ticker}`);
            return;
        }

        const stock = this._stocks.get(ticker)!;

        if (quantity > stock.getQuantity()) {
            console.log(`You only have ${stock.getQuantity()} shares of ${ticker}`);
            return;
        }

        const { price } = await getCurrentPrice(ticker);
        const tickerIWannaSell = price * quantity;
        this._balance += tickerIWannaSell;

        stock.subQuantity(quantity);

        if (stock.getQuantity() === 0) {
            this._stocks.delete(ticker);
        }

        console.log(`Sold ${quantity} shares of ${ticker} at $${price} each.`);

        // Number tickerIWannaSell = await getCurrentPrice(ticker) * quanity;
        // this.balance += tickerIWannaSell;
    }

    public checkTotalProfit(): number{
        let totalProfit = 0;
        for (const [ticker, stock] of this._stocks) {
            const { currentGrossValue, initialTotalValue } = stock;
            if (currentGrossValue && initialTotalValue) {
                totalProfit += currentGrossValue - initialTotalValue;
            }
        }
        return totalProfit;
    }

    // should make a thing where i check ALL profit and indiviual stock profit
    public checkStockProfit(ticker: string): number {
        if (!this._stocks.has(ticker)) {
            console.log("No records for that ticker");
            return 0;
        }

        const initValue = this._stocks.get(ticker)?.initialTotalValue;
        const grossValue = this._stocks.get(ticker)?.currentGrossValue;
        this._stocks.get(ticker); //left off here FLKDSHKJDSHFKLJDSHFHKJ still needs work

        if (!initValue || !grossValue) {
            console.log("No records for that ticker");
            return 0;
        }

        // maybe need 64-bit: (TypeScript numbers are IEEE-754 doubles)
        const profitLossPercentage = grossValue / initValue - 1.0;
        return profitLossPercentage;
    }   

    public get balance(): number {
        return this._balance;
    }

    public set balance(newBalance: number) {
        this._balance = newBalance;
    }

    public addToBalance(additionalBal: number){
        this._balance += additionalBal;
    }

    public set id(newId: string){
        this._id = newId;
    }

    public get id(): string {
        return this._id;
    }
}

async function testSession() {
    const session = new Session("user123", 1000);
    console.log("Initial balance:", session.balance);

    await session.buyStock("AAPL", 2);
    await session.buyStock("TSLA", 1);

    console.log("Balance after buying:", session.balance);
    console.log("Current stocks:", session._stocks);

    const profitAAPL = await session.checkStockProfit("AAPL");
    console.log("AAPL profit %:", (profitAAPL * 100).toFixed(2));

    await session.sellStock("AAPL", 1);
    console.log("Balance after selling 1 AAPL:", session.balance);

    const totalProfit = session.checkTotalProfit();
    console.log("Total profit across all stocks:", totalProfit);
}

testSession();
