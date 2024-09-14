import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import Button from "../components/Button";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import * as Linking from "expo-linking";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { buildUrl } from "@/utils/buildUrl";
import { decryptPayload } from "@/utils/decryptPayload";
import { encryptPayload } from "@/utils/encryptPayload";
import { Link } from "expo-router";
import { useRouter } from 'expo-router';

const onConnectRedirectLink = Linking.createURL("onConnect");
const onDisconnectRedirectLink = Linking.createURL("onDisconnect");

const connection = new Connection(clusterApiUrl("devnet"));

export default function App() {
  const router = useRouter();

  const [phantomWalletPublicKey, setPhantomWalletPublicKey] =
    useState<PublicKey | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();

  const [session, setSession] = useState<string>();

  const [deepLink, setDeepLink] = useState<string>("");

  // On app start up, check if we were opened by an inbound deeplink. If so, track the intial URL. Then, listen for a "url" event
  useEffect(() => {
    const initializeDeeplinks = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    };
    initializeDeeplinks();
    const listener = Linking.addEventListener("url", handleDeepLink);
    return () => {
      listener.remove();
    };
  }, []);

  // When a "url" event occurs, track the url
  const handleDeepLink = ({ url }: Linking.EventType) => {
    setDeepLink(url);
  };

  // Handle in-bound links
  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;

    // Handle an error response from Phantom
    if (params.get("errorCode")) {
      const error = Object.fromEntries([...params]);
      const message =
        error?.errorMessage ??
        JSON.stringify(Object.fromEntries([...params]), null, 2);
      console.log("error: ", message);
      return;
    }

    // Handle a `connect` response from Phantom
    if (/onConnect/.test(url.host)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair.secretKey
      );
      const connectData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecretDapp
      );
      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      const newPublicKey = new PublicKey(connectData.public_key);
      setPhantomWalletPublicKey(newPublicKey);
      console.log(`connected to ${newPublicKey.toString()}`);
      
      // Instead of navigating, just update the URL with the public key
      router.setParams({ phantomPublicKey: newPublicKey.toString() });
    }

    if (/onDisconnect/.test(url.host)) {
      setPhantomWalletPublicKey(null);
      console.log("disconnected");
    }
  }, [deepLink]);

  // Initiate a new connection to Phantom
  const connect = async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: "devnet",
      app_url: "https://quartzpay.io",
      redirect_link: onConnectRedirectLink,
    });

    console.log("Pressed connect button!!");

    const url = buildUrl("connect", params);
    Linking.openURL(url);
  };

  // Initiate a disconnect from Phantom
  const disconnect = async () => {
    const payload = {
      session,
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onDisconnectRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });
    const url = buildUrl("disconnect", params);
    Linking.openURL(url);
  };

  // Initiate a new transaction via Phantom.
  const signAndSendTransaction = async (transaction: Transaction) => {
    console.log("signAndSendTransaction");
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {phantomWalletPublicKey ? (
            <>
              <View style={[styles.row, styles.wallet]}>
                <View style={styles.greenDot} />
                <Text
                  style={styles.text}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {`Connected to: ${phantomWalletPublicKey.toString()}`}
                </Text>
              </View>
              <View style={styles.row}>
                <Button title="Disconnect" onPress={disconnect} />
              </View>
            </>
          ) : (
            <View style={{ marginTop: 15 }}>
              <Button title="Connect Phantom!!!" onPress={connect} />
            </View>
          )}
        </View>
        <View style={{ marginTop: 15, alignItems: "center" }}>
          <Link href="/onConnect" asChild>
            <Text style={{ fontSize: 20, color: COLORS.WHITE }}>Create or Restore Keypair</Text>
          </Link>
        </View>
        {submitting && (
          <ActivityIndicator
            color={COLORS.WHITE}
            size="large"
            style={styles.spinner}
          />
        )}
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_GREY,
    flexGrow: 1,
    position: "relative",
  },
  greenDot: {
    height: 8,
    width: 8,
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: COLORS.GREEN,
  },
  header: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  spinner: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    zIndex: 1000,
  },
  text: {
    color: COLORS.LIGHT_GREY,
    width: "100%",
  },
  wallet: {
    alignItems: "center",
    margin: 10,
    marginBottom: 15,
  },
});