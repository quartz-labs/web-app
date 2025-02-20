import { DriftClient } from "@drift-labs/sdk";
import { MarketIndex } from "../config/tokens.js";
import { DummyWallet } from "../types/classes/dummyWallet.class.js";
import { QUARTZ_DRIFT_ACCOUNT } from "../config/constants.js";
export class DriftClientService {
    static instance;
    driftClient;
    driftClientInitPromise;
    constructor(connection) {
        const wallet = new DummyWallet(QUARTZ_DRIFT_ACCOUNT);
        this.driftClient = new DriftClient({
            connection: connection,
            wallet: wallet,
            env: 'mainnet-beta',
            userStats: false,
            perpMarketIndexes: [],
            spotMarketIndexes: [...MarketIndex],
            accountSubscription: {
                type: 'websocket',
                commitment: "confirmed"
            }
        });
        this.driftClientInitPromise = this.driftClient.subscribe();
    }
    static async getDriftClient(connection) {
        if (!DriftClientService.instance) {
            DriftClientService.instance = new DriftClientService(connection);
        }
        await DriftClientService.instance.driftClientInitPromise;
        return DriftClientService.instance.driftClient;
    }
}
//# sourceMappingURL=driftClientService.js.map