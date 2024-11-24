import * as crypto from "expo-crypto";

//Securely wipes a Uint8Array by overwriting it with random data multiple times.
export function secureWipe(data: Uint8Array): void {
  if (!(data instanceof Uint8Array)) {
    throw new Error("Input must be a Uint8Array");
  }

  const length = data.length;
  const iterations = 3;

  try {
    for (let i = 0; i < iterations; i++) {
      const randomBytes = crypto.getRandomValues(new Uint8Array(length));
      data.set(randomBytes);
    }
  } catch (error) {
    console.error("Error during secure wipe:", error);
    // Fallback to a less secure but still somewhat effective method
    for (let i = 0; i < length; i++) {
      data[i] = Math.floor(Math.random() * 256);
    }
  } finally {
    // Final overwrite with zeros
    data.fill(0);
  }

  // Attempt to prevent compiler/runtime optimizations
  return void 0;
}

// Usage example:
// const sensitiveData = new Uint8Array([1, 2, 3, 4, 5]);
// secureWipe(sensitiveData);
// console.log(sensitiveData); // Should output all zeros
