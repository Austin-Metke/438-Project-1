// Senen Bagos
// This Class handles making new buy/sell accounts managing your currency, profit/loss dividends xyz
// A user can have multiple to test out different trading tactics
import { getCurrentPrice } from "./stockPrice";

export class Session {
    private _id: string;
    private _balance: number;
    profitLoss: number;
    tickers: string[]; // this array is to store the tickers weve bought from to have the data, probably a better way to handle it ngl
    public initialPurchases: Map<string, number>; //this is meant to store the orignal value it was bought at for comparison 
    public tickerGrossValue: Map<string, number>;

    constructor(id: string, balance: number) {
        this._id = id;
        this._balance = balance
        this.profitLoss = 0;
        this.tickers = [];
        this.initialPurchases = new Map<string, number>();
        this.tickerGrossValue = new Map<string, number>();
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

    //quanity = 1 by default somehow
    public async buyStock(ticker: string, quantity: number = 1 ): Promise<void>{
        if(quantity <= 0){
            console.log("You cant buy 0 or negative stock")
            return;
        }
        
        const { price } = await getCurrentPrice(ticker); //price is from the quote json thingy this method returns
        const totalValue = price * quantity;

        if(totalValue > this._balance){
            console.log("You cant afford it")
        } else {
            this.balance -= totalValue;
            this.tickers.push(ticker);
            
            // this checks if we already have some of the same stock, if not it adds 0 to what you bought
            const prev = this.initialPurchases.get(ticker) ?? 0;
            this.initialPurchases.set(ticker, prev + totalValue);
        }
    }

    public async sellStock(ticker: string, quantity: number): Promise<void> {

        //TODO check if i even have the stock in stock
        //TODO sell all or sell some nad keep hashmap in check
        //TODO if sell some take away from profit
        // check if quanity matches
        const { price } = await getCurrentPrice(ticker);
        const tickerIWannaSell = price * quantity;
        this._balance += tickerIWannaSell;

        // Number tickerIWannaSell = await getCurrentPrice(ticker) * quanity;
        // this.balance += tickerIWannaSell;
    }

    public updateStockPrice(){
        //just go thru each ticker you have and store current price on to the tickerGrossValue hashMap
        // line 61 problem with making sure the grossPorfit is correct
    }

    public checkProfit(ticker: string): number {
        const initValue = this.initialPurchases.get(ticker);
        const grossValue = this.tickerGrossValue.get(ticker);

        if (!initValue || !grossValue) {
        console.log("No records for that ticker");
        return 0;
        }

        // maybe need 64-bit: (TypeScript numbers are IEEE-754 doubles)
        const profitLossPercentage = grossValue / initValue - 1.0;
        return profitLossPercentage;
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