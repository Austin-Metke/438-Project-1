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
            
            this._stocks.get(ticker)?.addToInitialTotalValue(totalValue);// ? is to see if it exists even tho i did the check, maybe can make the code better later
            
        } else { //buy and set the stock to the hashmap
            const stock = await Stock.create(ticker, quantity);            
            this.balance -= totalValue;
            this._stocks.set(ticker, stock); // sets hashmap with stock ("AAPL", aapl object)
        }
    }

    public async sellStock(ticker: string, quantity: number): Promise<void> {
        //TODO check if i even have the stock in stock
        //TODO sell all or sell some and keep hashmap in check
        //TODO if sell some take away from profit
        // check if quanity matches
        const { price } = await getCurrentPrice(ticker);
        const tickerIWannaSell = price * quantity;
        this._balance += tickerIWannaSell;

        // Number tickerIWannaSell = await getCurrentPrice(ticker) * quanity;
        // this.balance += tickerIWannaSell;
    }

    public checkTotalProfit(): number{
        return 0;
    }

    // should make a thing where i check ALL profit and indiviual stock profit
    public checkStockProfit(ticker: string): number {
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

// console.log("Hello")
// const session1 = new Session("acc-001", 1000);
// console.log("ID:", session1.id);              // acc-001
// console.log("Balance:", session1.balance);    // 1000
// console.log("Profit/Loss:", session1.profitLoss); // 0
//
// // --- Test setters ---
// session1.id = "acc-002";   // calls the set id()
// console.log("New ID:", session1.id);  // acc-002
//
// session1.balance = 2000;   // calls the set balance()
// console.log("New Balance:", session1.balance); // 2000
//
// // --- Test addToBalance() ---
// session1.addToBalance(500);
// console.log("Balance after add:", session1.balance); // 2500
//
// // --- Test ticker array ---
// session1.ticker.push("AAPL");
// session1.ticker.push("TSLA");
// console.log("Tickers:", session1.ticker);