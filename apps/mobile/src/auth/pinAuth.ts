// TODO: Implement PIN/password fallback authentication
// - Implement a secure PIN/password as a fallback
// - Encrypt the master key using a PIN-derived key
// - Store this encrypted master key in the keychain using expo-secure-store
// - Use PBKDF2 for key derivation from the PIN/password
// - Do not store the PIN or the PIN-derived key
// - Do the same for the app-level encryption key