import { DriftClient } from "@drift-labs/sdk";
import type { Connection } from "@solana/web3.js";
export declare class DriftClientService {
    private static instance;
    private driftClient;
    private driftClientInitPromise;
    private constructor();
    static getDriftClient(connection: Connection): Promise<DriftClient>;
}
//# sourceMappingURL=driftClientService.d.ts.map