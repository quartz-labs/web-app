/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/drift.json`.
 */
export type DriftProgram = {
  "address": "dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH",
  "metadata": {
    "name": "drift",
    "version": "2.95.0",
    "spec": "0.1.0"
  },
  "instructions": [
    {
      "name": "initializeUser",
      "discriminator": [
        111,
        17,
        185,
        250,
        60,
        122,
        38,
        254
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "userStats",
          "writable": true
        },
        {
          "name": "state",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "subAccountId",
          "type": "u16"
        },
        {
          "name": "name",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "initializeUserStats",
      "discriminator": [
        254,
        243,
        72,
        98,
        251,
        130,
        168,
        213
      ],
      "accounts": [
        {
          "name": "userStats",
          "writable": true
        },
        {
          "name": "state",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "rent"
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": []
    },
    {
      "name": "beginSwap",
      "discriminator": [
        174,
        109,
        228,
        1,
        242,
        105,
        232,
        105
      ],
      "accounts": [
        {
          "name": "state"
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "userStats",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "outSpotMarketVault",
          "writable": true
        },
        {
          "name": "inSpotMarketVault",
          "writable": true
        },
        {
          "name": "outTokenAccount",
          "writable": true
        },
        {
          "name": "inTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "driftSigner"
        },
        {
          "name": "instructions",
          "docs": [
            "Instructions Sysvar for instruction introspection"
          ]
        }
      ],
      "args": [
        {
          "name": "inMarketIndex",
          "type": "u16"
        },
        {
          "name": "outMarketIndex",
          "type": "u16"
        },
        {
          "name": "amountIn",
          "type": "u64"
        }
      ]
    },
    {
      "name": "endSwap",
      "discriminator": [
        177,
        184,
        27,
        193,
        34,
        13,
        210,
        145
      ],
      "accounts": [
        {
          "name": "state"
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "userStats",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "outSpotMarketVault",
          "writable": true
        },
        {
          "name": "inSpotMarketVault",
          "writable": true
        },
        {
          "name": "outTokenAccount",
          "writable": true
        },
        {
          "name": "inTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "driftSigner"
        },
        {
          "name": "instructions",
          "docs": [
            "Instructions Sysvar for instruction introspection"
          ]
        }
      ],
      "args": [
        {
          "name": "inMarketIndex",
          "type": "u16"
        },
        {
          "name": "outMarketIndex",
          "type": "u16"
        },
        {
          "name": "limitPrice",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "reduceOnly",
          "type": {
            "option": {
              "defined": {
                "name": "swapReduceOnly"
              }
            }
          }
        }
      ]
    },
  ]
};
