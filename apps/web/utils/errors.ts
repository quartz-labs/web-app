import { ShowErrorProps } from "@/context/error-provider";
import { PublicKey } from "@solana/web3.js";
import posthog from "posthog-js";

export function captureError(
    showError: (props: ShowErrorProps) => void, 
    errorString: string, 
    location: string, 
    error: any,
    wallet?: PublicKey, 
    silentError: boolean = false,
) {
    console.error(error);

    const walletString = wallet ? wallet.toBase58() : 'AddressNotProvided';
    const errorStack = (error instanceof Error ? error : new Error(errorString)).stack?.split('\n')[1]?.trim() || '';

    const id = generateErrorId();

    if (!silentError) {
        showError({
            message: errorString,
            body: error.toString(),
            errorId: id
        });
    }

    posthog.capture(`Error: ${errorString}`, {
        error: error,
        errorId: id,
        location: location,
        line: errorStack.toString(),
        wallet: walletString,
    })
}

const generateErrorIdSection = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};
  
const generateErrorId = () => {
    return [generateErrorIdSection(), generateErrorIdSection(), generateErrorIdSection()].join('-');
};
