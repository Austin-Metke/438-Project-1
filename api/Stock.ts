// Senen Bagos 
// This class handles indivual stock in a user's session 
import { getCurrentPrice } from "./stockPrice";

export class Stock {
    private _ticker: string; // ticker like AAPL
    private _quantity: number; // amount of stock
    private _initialTotalValue: number; //total price when it was first bought
    private _currentGrossValue: number; //this number should get updated daily so it could be +- the initial value

    // when a stock gets bought this is called
    private constructor(ticker: string, quantity: number, initialTotalValue: number) {
        this._ticker = ticker;
        this._quantity = quantity;
        this._initialTotalValue = initialTotalValue;
        this._currentGrossValue = initialTotalValue;
    }

    public static async create(ticker: string, quantity: number): Promise<Stock> {
        const price = await Stock.getCurrentPriceHelper(ticker);
        const initialTotalValue = price * quantity;
        return new Stock(ticker, quantity, initialTotalValue);
    }

    public static async getCurrentPriceHelper(ticker: string): Promise<number>{
        const { price } = await getCurrentPrice(ticker);
        return price;
    }

    public async refresh(): Promise<void> {
        const price = await Stock.getCurrentPriceHelper(this._ticker);
        this._currentGrossValue = price * this._quantity;
    }

    public get initialPricePerShare(): number {
        return this._initialTotalValue / this._quantity;
    }
    
    public get currentPricePerShare(): number {
        return this._currentGrossValue / this._quantity;
    }

    // PnL is profit/loss
    // this method returns total value in dollars
    public get unrealizedPnL(): number {
        return this._currentGrossValue - this._initialTotalValue;
    }

    //this returns total value in a percent
    public get unrealizedPnLPercent(): number {
        if (this._initialTotalValue === 0) return 0;
        return (this.unrealizedPnL / this._initialTotalValue) * 100;
    }

    public get ticker(): string {
        return this._ticker;
    }
}