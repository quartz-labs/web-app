/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/funds_program.json`.
 */
export type FundsProgram = {
  "address": "B91b1VtvTSzcwJ5JDgbtJYf8syfE1HSsfW3C8iFgwcYN",
  "metadata": {
    "name": "fundsProgram",
    "version": "0.0.1",
    "spec": "0.1.0",
    "description": "Quartz funds program"
  },
  "instructions": [
    {
      "name": "closeUser",
      "discriminator": [
        86,
        219,
        138,
        140,
        236,
        24,
        118,
        200
      ],
      "accounts": [
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "initUser",
      "discriminator": [
        14,
        51,
        68,
        159,
        237,
        78,
        158,
        102
      ],
      "accounts": [
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "vaultUsdc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "usdcMint"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "usdcMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "withdrawLamports",
      "discriminator": [
        251,
        144,
        115,
        229,
        113,
        247,
        206,
        64
      ],
      "accounts": [
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawUsdc",
      "discriminator": [
        114,
        49,
        72,
        184,
        27,
        156,
        243,
        155
      ],
      "accounts": [
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "vaultUsdc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "usdcMint"
              }
            ]
          }
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "receiverUsdc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "receiver"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "usdcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "usdcMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vault",
      "discriminator": [
        211,
        8,
        232,
        43,
        2,
        152,
        117,
        119
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidQuartzAccount",
      "msg": "Invalid Quartz account"
    },
    {
      "code": 6001,
      "name": "invalidInitPayer",
      "msg": "Invalid init_payer"
    },
    {
      "code": 6002,
      "name": "insufficientFunds",
      "msg": "Insufficent funds for transaction"
    },
    {
      "code": 6003,
      "name": "invalidMintAddress",
      "msg": "Invalid SPL token mint address"
    }
  ],
  "types": [
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "usdcMintAddress",
      "type": "pubkey",
      "value": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    }
  ]
};
