// Senen Bagos
// This Class handles making new buy/sell accounts managing your currency, profit/loss dividends xyz
// A user can have multiple to test out different trading tactics

export class Session {
    private _id: string;
    private _balance: number;
    profitLoss: number;
    ticker: string[]

    constructor(id: string, balance: number) {
        this._id = id;
        this._balance = balance
        this.profitLoss = 0;
        this.ticker = []
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