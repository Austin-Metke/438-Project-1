// Senen Bagos
// This Class handles making new buy/sell accounts managing your currency, profit/loss dividends xyz
// A user can have multiple to test out different trading tactics
import { Stock } from "./Stock";
import { getCurrentPrice } from "./stockPrice";

export class Session {
    private _id: string;
    private _balance: number;
    profitLoss: number;
    tickers: string[]; // this array is to store the tickers weve bought from to have the data, probably a better way to handle it ngl 9/18, HASHMAPS!!
    public initialPurchases: Map<string, number>; //this is meant to store the orignal value it was bought at for comparison :note: i need to also count the quanity 
    public tickerGrossValue: Map<string, number>;
    public tickersss: Map<string, Stock>;

    // TODO bought at date

    constructor(id: string, balance: number) {
        this._id = id;
        this._balance = balance
        this.profitLoss = 0;
        this.tickers = [];
        this.initialPurchases = new Map<string, number>();
        this.tickerGrossValue = new Map<string, number>();
        this.tickersss = new Map<string, Stock>;
        // make ticker, quantity hashmap??? - will make a stock class to manage it all 
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
        // v  might remove this but it works 
        const { price } = await getCurrentPrice(ticker); //price is from the quote json thingy this method returns
        const totalValue = price * quantity;

        if(totalValue > this._balance){ 
            console.log("You cant afford it")
        } else if (this.tickersss.has(ticker)){ //if stock is already in users account add to it 
            const prev = this.initialPurchases.get(ticker) ?? 0;
            this.initialPurchases.set(ticker, prev + totalValue);
        } else { //buy and set the stock

            const stock = await Stock.create(ticker, quantity);            
            this.balance -= totalValue;
            this.tickersss.set(ticker, stock);

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

    public updateStockPrice(){
        //just go thru each ticker you have and store current price from the api on to the tickerGrossValue hashMap
        // now that i think about it i should just make a stock class that holds all the relevant data...
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