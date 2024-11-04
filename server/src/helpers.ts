import { BN } from "@drift-labs/sdk";

export function bnToDecimal(bn: BN, decimalPlaces: number): number {
    const decimalFactor = Math.pow(10, decimalPlaces);
    return bn.toNumber() / decimalFactor;
}
  