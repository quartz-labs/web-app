import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, TextInput } from "react-native";
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getKeypairPublicKey } from "../src/crypto/solanaKeypair";
import { COLORS } from "../constants";
import { createSolanaKeypair, deleteSolanaKeypair } from "@/src/wallet/keyManagement";
import { signTransaction } from "@/src/wallet/transactionSigning";
import { useLocalSearchParams } from 'expo-router';

export default function OnConnect() {
  const { phantomPublicKey } = useLocalSearchParams();
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState<PublicKey | null>(null);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const generateKeypair = async () => {
    setLoading(true);
    try {
      const publicKey = await createSolanaKeypair();
      setPublicKey(publicKey);

      setError(null);
    } catch (err) {
      setError("Failed to generate keypair");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPublicKey = async () => {
    setLoading(true);
    try {
      const storedPublickey = await getKeypairPublicKey();
      setPublicKey(storedPublickey);
      setError(null);
    } catch (err) {
      setError("Failed to get public key");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteKeypair = async () => {
    setLoading(true);
    try {
      const result = await deleteSolanaKeypair();
      if (!result) {
        setError("Failed to delete keypair");
        return;
      }
      setPublicKey(null);
      setBalance(null);
    } catch (err) { 
      setError("Failed to delete keypair");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestAirdrop = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const airdropSignature = await connection.requestAirdrop(
        publicKey,
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
    if (!publicKey) return;
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (err) {
      setError("Failed to fetch balance");
      console.error(err);
    }
  };

  const sendTransaction = async () => {
    if (!publicKey) {
        setError("Failed to get public key");
        return;
    }
    setLoading(true);
    try {
      const recipientPubkey = new PublicKey(recipientAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: LAMPORTS_PER_SOL / 100,
        })
      );
      const signedTransaction = await signTransaction(transaction);
      //TODO: Update to use transactionSender logic in wallet/transactionSender.ts
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(signature);
      updateBalance();
    } catch (err) {
      setError("Transaction failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phantomPublicKey) {
      try {
        const pubKey = new PublicKey(phantomPublicKey as string);
        setPhantomWalletPublicKey(pubKey);
      } catch (error) {
        console.error("Invalid public key:", error);
      }
    }
  }, [phantomPublicKey]);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {phantomWalletPublicKey && (
        <Text>Phantom Wallet Public Key: {phantomWalletPublicKey.toString()}</Text>
      )}
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
          <Button title="Delete" onPress={deleteKeypair} disabled={loading} />
          {loading && <ActivityIndicator color={COLORS.WHITE} />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          <Button title="Create Account" onPress={generateKeypair} disabled={loading} />
          {loading && <ActivityIndicator color={COLORS.WHITE} />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          <Button title="Get existing" onPress={getPublicKey} disabled={loading} />
          {loading && <ActivityIndicator color={COLORS.WHITE} />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </>
      )}
    </View>
  );
}