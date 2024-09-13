import "react-native-get-random-values";
import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, TextInput } from "react-native";
import { Keypair, Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createAndStoreKeypair, getStoredKeypair } from "../src/crypto/solanaKeypair";
import { COLORS } from "../constants";

export default function OnConnect() {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const generateKeypair = async () => {
    setLoading(true);
    try {
      const publicKey = await createAndStoreKeypair();
      setPublicKey(publicKey);

      setError(null);
    } catch (err) {
      setError("Failed to generate keypair");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getKeypair = async () => {
    setLoading(true);
    try {
      const storedKeypair = await getStoredKeypair();
      setKeypair(storedKeypair);
      if (storedKeypair) {
        setPublicKey(storedKeypair.publicKey);
      }
      setError(null);
    } catch (err) {
      setError("Failed to get keypair");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestAirdrop = async () => {
    if (!keypair) return;
    setLoading(true);
    try {
      const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
      updateBalance();
    } catch (err) {
      setError("Airdrop failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = async () => {
    if (!keypair) return;
    try {
      const balance = await connection.getBalance(keypair.publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (err) {
      setError("Failed to fetch balance");
      console.error(err);
    }
  };

  const sendTransaction = async () => {
    if (!keypair) {
      await getKeypair();
      if (!keypair) {
        setError("Failed to get keypair");
        return;
      }
    }
    setLoading(true);
    try {
      const recipientPubkey = new PublicKey(recipientAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          toPubkey: recipientPubkey,
          lamports: LAMPORTS_PER_SOL / 100,
        })
      );
      const signature = await connection.sendTransaction(transaction, [keypair]);
      await connection.confirmTransaction(signature);
      updateBalance();
    } catch (err) {
      setError("Transaction failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {publicKey ? (
        <>
          <Text>Public Key: {publicKey.toString()}</Text>
          <Text>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</Text>
          <Button title="Request Airdrop" onPress={requestAirdrop} disabled={loading} />
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', padding: 5, marginVertical: 10, width: '80%' }}
            placeholder="Enter recipient address"
            value={recipientAddress}
            onChangeText={setRecipientAddress}
          />
          <Button title="Send Transaction" onPress={sendTransaction} disabled={loading || !recipientAddress} />
          {loading && <ActivityIndicator color={COLORS.WHITE} />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </>
      ) : (
        <>
          <Button title="Generate" onPress={generateKeypair} disabled={loading} />
          {loading && <ActivityIndicator color={COLORS.WHITE} />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          <Button title="Get existing" onPress={getKeypair} disabled={loading} />
          {loading && <ActivityIndicator color={COLORS.WHITE} />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </>
      )}
    </View>
  );
}