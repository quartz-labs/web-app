import {Connection} from "@solana/web3.js";
import {Wallet, loadKeypair} from "@drift-labs/sdk";

//const connection = new Connection('https://api.mainnet-beta.solana.com');
const connection = new Connection('https://api.devnet.solana.com');


const keyPairFile = `${process.env.HOME}/.config/solana/my-keypair.json`;
const wallet = new Wallet(loadKeypair(keyPairFile));

const driftClient = new DriftClient({
    connection,
    wallet,
    env: 'mainnet-beta',
  });
  
  await driftClient.subscribe();