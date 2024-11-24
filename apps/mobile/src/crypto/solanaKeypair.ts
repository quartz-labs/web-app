import * as SecureStore from 'expo-secure-store';
import { Keypair, PublicKey } from '@solana/web3.js';
import * as crypto from 'expo-crypto';
import Aes from 'react-native-aes-crypto';
import { getOrCreateMasterKey, getMasterKey } from './masterKey';
import { secureWipe } from './secureWipe';


const encryptPrivateKey = async (privateKey: Uint8Array, masterKey: Uint8Array): Promise<string> => {
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encryptedData = await Aes.encrypt(
        Buffer.from(privateKey).toString('base64'),
        Buffer.from(masterKey).toString('base64'),
        Buffer.from(iv).toString('base64'),
        'aes-256-cbc'
    );

    secureWipe(masterKey);
    secureWipe(privateKey);

    return JSON.stringify({
        iv: Buffer.from(iv).toString('base64'),
        encryptedData
    });
};

const decryptPrivateKey = async (encryptedData: string, masterKey: Uint8Array): Promise<Uint8Array> => {
    const { iv, encryptedData: data } = JSON.parse(encryptedData);
    const decrypted = await Aes.decrypt(
        data,
        Buffer.from(masterKey).toString('base64'),
        iv,
        'aes-256-cbc'
    );

    secureWipe(masterKey);

    return new Uint8Array(Buffer.from(decrypted, 'base64'));
};

export const createAndStoreKeypair = async (): Promise<PublicKey | null> => {
    try {
        const keypair = Keypair.generate();
        const masterKey = await getOrCreateMasterKey();

        const publicKey = keypair.publicKey;

        const encryptedPrivateKey = await encryptPrivateKey(keypair.secretKey, masterKey);

        await SecureStore.setItemAsync('quartz_sol_private_key', encryptedPrivateKey);

        return publicKey;
    } catch (error) {
        console.error('Failed to generate and store keypair:', error);
        throw new Error('Keypair generation failed');
    }
};

export const getStoredKeypair = async (): Promise<Keypair | null> => {
    try {
        const encryptedPrivateKey = await SecureStore.getItemAsync('quartz_sol_private_key');
        if (!encryptedPrivateKey) return null;

        const masterKey = await getMasterKey();

        if (!masterKey) {
            console.error('Master key not found');
            return null;
        }

        const decryptedPrivateKey = await decryptPrivateKey(encryptedPrivateKey, masterKey);

        return Keypair.fromSecretKey(decryptedPrivateKey);
    } catch (error) {
        console.error('Failed to retrieve stored keypair:', error);
        return null;
    }
};

export const deleteStoredKeypair = async (): Promise<boolean> => {
    try {
        await SecureStore.deleteItemAsync('quartz_sol_private_key');
        return true;
    } catch (error) {
        console.error('Failed to delete stored keypair:', error);
        return false;
    }
};

export const getKeypairPublicKey = async (): Promise<PublicKey | null> => {
    try {
        const keypair = await getStoredKeypair();
        if (!keypair) return null;
        const publicKey = keypair.publicKey;

        secureWipe(keypair.secretKey);

        return publicKey;
    } catch (error) {
        console.error('Failed to get public key:', error);
        return null;
    }
};