import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Wallet, DriftClient, User as DriftUser, calculateDepositRate, calculateBorrowRate } from "@drift-labs/sdk";
import { DRIFT_MARKET_INDEX_SOL, HELIUS_RPC_URL, LOCAL_SECRET, MICRO_CENTS_PER_USDC } from "../config.js";
import { bnToDecimal } from "../helpers.js";

export async function getDriftBalances(address: string, marketIndicesParam: string, driftClientManager: DriftClientManager) {
    const marketIndices = marketIndicesParam.split(',').map(Number).filter(n => !isNaN(n));
    const balances = await driftClientManager.getUserBalances(address, marketIndices);
    return balances;
}


export async function getDriftRates(marketIndicesParam: string, driftClientManager: DriftClientManager) {
    const marketIndices = marketIndicesParam.split(',').map(Number).filter(n => !isNaN(n));

    const spotMarketPromises = marketIndices.map(async (index) => {
        const spotMarket = await driftClientManager.getSpotMarketAccount(index);
        if (!spotMarket) throw new Error(`Could not find spot market for index ${index}`);
    
        const depositRateBN = calculateDepositRate(spotMarket);
        const borrowRateBN = calculateBorrowRate(spotMarket);
    
        return {
            depositRate: bnToDecimal(depositRateBN, 6),
            borrowRate: bnToDecimal(borrowRateBN, 6)
        };
    });
    
    const rates = await Promise.all(spotMarketPromises);
    return rates;
}
  

export class DriftClientManager {
    private driftClient!: DriftClient;
    private connection!: Connection;
    private wallet!: Wallet;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 10;
    private baseReconnectDelay: number = 1000; // 1 second

    constructor() {
        this.initializeDriftClient();
    }

    private async initializeDriftClient() {
        try {
            this.connection = new Connection(HELIUS_RPC_URL || 'https://api.mainnet-beta.solana.com');
 
            const secret = JSON.parse(LOCAL_SECRET ?? "") as number[]
            const secretKey = Uint8Array.from(secret)
            const keypair = Keypair.fromSecretKey(secretKey)

            this.wallet = new Wallet(keypair);

            console.log("wallet created with keypair:", this.wallet.publicKey.toBase58());


            this.driftClient = new DriftClient({
                connection: this.connection,
                wallet: this.wallet,
                env: 'mainnet-beta',
            });

            await this.driftClient.subscribe();
            console.log('DriftClient initialized and subscribed successfully');
            this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
        } catch (error) {
            console.error('Error initializing DriftClient:', error);
            this.handleReconnection();
        }
    }

    private async handleReconnection() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            const delay = this.baseReconnectDelay * Math.pow(2, this.reconnectAttempts);
            console.log(`Attempting to reconnect in ${delay}ms...`);
            setTimeout(() => {
                this.reconnectAttempts++;
                this.initializeDriftClient();
            }, delay);
        } else {
            console.error('Max reconnection attempts reached. Please check your connection and try again later.');
        }
    }

    public async getUserBalances(address: string, marketIndices: number[]): Promise<any> {
        try {
            await this.driftClient.emulateAccount(new PublicKey(address));
            const user = this.driftClient.getUser();

            const balances = marketIndices.reduce((acc, marketIndex) => {
                acc[marketIndex] = queryDriftBalance(user, marketIndex);
                return acc;
            }, {} as { [key: number]: number });

            return balances;
        } catch (error) {
            console.error('Error getting user balance:', error);
            throw error;
        }
    }

    public async getSpotMarketAccount(marketIndex: number) {
        return await this.driftClient.getSpotMarketAccount(marketIndex);
    }
}

function queryDriftBalance(user: DriftUser, marketIndex: number) {
    const rawBalance = user.getTokenAmount(marketIndex);
    const decimalPlaces = getDecimalPlaces(marketIndex);
    const formattedBalance = Number(rawBalance.toString(10)) / decimalPlaces;
    return formattedBalance;
}

function getDecimalPlaces(marketIndex: number) {
    //TODO: logic that gets decimal places based on the market index, either from data base or from drift client
    const decimalPlaces = (marketIndex === DRIFT_MARKET_INDEX_SOL) ? LAMPORTS_PER_SOL : MICRO_CENTS_PER_USDC;
    return decimalPlaces;
}