import * as Keychain from 'react-native-keychain';
import { secureWipe } from './secureWipe';
import * as crypto from 'expo-crypto';

const MASTER_KEY_SIZE = 32; // 256 bits
const MASTER_KEY_ALIAS = 'app_master_key';

export const createMasterKey = async (): Promise<Uint8Array> => {
  return crypto.getRandomValues(new Uint8Array(MASTER_KEY_SIZE));
};

export const storeMasterKey = async (masterKey: Uint8Array): Promise<boolean> => {
  try {
    const result = await Keychain.setGenericPassword(
      MASTER_KEY_ALIAS,
      Buffer.from(masterKey).toString('base64'),
      {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      }
    );

    secureWipe(masterKey);
    
    return !!result;
  } catch (error) {
    console.error('Failed to store master key:', error);
    return false;
  }
};

export const getMasterKey = async (): Promise<Uint8Array | null> => {
  try {
    const result = await Keychain.getGenericPassword({
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    });
    if (result) {
      return new Uint8Array(Buffer.from(result.password, 'base64'));
    }
    return null;
  } catch (error) {
    console.error('Failed to retrieve master key:', error);
    return null;
  }
};

export const getOrCreateMasterKey = async (): Promise<Uint8Array> => {
  const masterKey = await getMasterKey();
  if (masterKey) {
    return masterKey;
  }
  const newKey = await createMasterKey();
  await storeMasterKey(newKey);
  return newKey;
};