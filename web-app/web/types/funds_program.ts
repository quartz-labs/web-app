/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/funds_program.json`.
 */
export type FundsProgram = {
  "address": "B6gXhjcwsD8uFsaaPNFxeswxSNM79iP5mPgBnmxQJjn2",
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
      "name": "depositLamports",
      "discriminator": [
        108,
        4,
        176,
        112,
        110,
        10,
        202,
        195
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
          "name": "vaultWsol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "wsolMint"
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
        },
        {
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  114,
                  105,
                  102,
                  116,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "userStats",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "spotMarketVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  112,
                  111,
                  116,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  1,
                  0
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "wsolMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "driftProgram"
        },
        {
          "name": "constAccount"
        },
        {
          "name": "spotMarket",
          "writable": true
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
      "name": "initDriftAccount",
      "discriminator": [
        148,
        140,
        139,
        85,
        251,
        185,
        66,
        116
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
        },
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "userStats",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  114,
                  105,
                  102,
                  116,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "driftProgram"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
          "name": "owner",
          "writable": true,
          "signer": true
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
          "name": "vaultWsol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "wsolMint"
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
        },
        {
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  114,
                  105,
                  102,
                  116,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "userStats",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "spotMarketVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  112,
                  111,
                  116,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  1,
                  0
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "driftSigner"
        },
        {
          "name": "wsolMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "driftProgram"
        },
        {
          "name": "constAccount"
        },
        {
          "name": "additionalAccount"
        },
        {
          "name": "spotMarketSol",
          "writable": true
        },
        {
          "name": "spotMarketUsdc"
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
                "kind": "account",
                "path": "vault"
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
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "ownerUsdc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "owner"
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
          "name": "state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  114,
                  105,
                  102,
                  116,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "userStats",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "spotMarketVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  112,
                  111,
                  116,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "driftSigner"
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
          "name": "driftProgram"
        },
        {
          "name": "constAccount"
        },
        {
          "name": "additionalAccount"
        },
        {
          "name": "spotMarketSol",
          "writable": true
        },
        {
          "name": "spotMarketUsdc"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountCents",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "state",
      "discriminator": [
        216,
        146,
        107,
        94,
        104,
        75,
        182,
        177
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    },
    {
      "name": "userStats",
      "discriminator": [
        176,
        223,
        136,
        27,
        122,
        79,
        32,
        227
      ]
    },
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
    },
    {
      "code": 6004,
      "name": "invalidDriftProgram",
      "msg": "Invalid Drift program address"
    },
    {
      "code": 6005,
      "name": "unableToLoadAccountLoader",
      "msg": "Unable to load account loader"
    }
  ],
  "types": [
    {
      "name": "feeStructure",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeTiers",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "feeTier"
                  }
                },
                10
              ]
            }
          },
          {
            "name": "fillerRewardStructure",
            "type": {
              "defined": {
                "name": "orderFillerRewardStructure"
              }
            }
          },
          {
            "name": "referrerRewardEpochUpperBound",
            "type": "u64"
          },
          {
            "name": "flatFillerFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "feeTier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeNumerator",
            "type": "u32"
          },
          {
            "name": "feeDenominator",
            "type": "u32"
          },
          {
            "name": "makerRebateNumerator",
            "type": "u32"
          },
          {
            "name": "makerRebateDenominator",
            "type": "u32"
          },
          {
            "name": "referrerRewardNumerator",
            "type": "u32"
          },
          {
            "name": "referrerRewardDenominator",
            "type": "u32"
          },
          {
            "name": "refereeFeeNumerator",
            "type": "u32"
          },
          {
            "name": "refereeFeeDenominator",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "marketType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "spot"
          },
          {
            "name": "perp"
          }
        ]
      }
    },
    {
      "name": "oracleGuardRails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceDivergence",
            "type": {
              "defined": {
                "name": "priceDivergenceGuardRails"
              }
            }
          },
          {
            "name": "validity",
            "type": {
              "defined": {
                "name": "validityGuardRails"
              }
            }
          }
        ]
      }
    },
    {
      "name": "order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slot",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "baseAssetAmount",
            "type": "u64"
          },
          {
            "name": "baseAssetAmountFilled",
            "type": "u64"
          },
          {
            "name": "quoteAssetAmountFilled",
            "type": "u64"
          },
          {
            "name": "triggerPrice",
            "type": "u64"
          },
          {
            "name": "auctionStartPrice",
            "type": "i64"
          },
          {
            "name": "auctionEndPrice",
            "type": "i64"
          },
          {
            "name": "maxTs",
            "type": "i64"
          },
          {
            "name": "oraclePriceOffset",
            "type": "i32"
          },
          {
            "name": "orderId",
            "type": "u32"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "orderStatus"
              }
            }
          },
          {
            "name": "orderType",
            "type": {
              "defined": {
                "name": "orderType"
              }
            }
          },
          {
            "name": "marketType",
            "type": {
              "defined": {
                "name": "marketType"
              }
            }
          },
          {
            "name": "userOrderId",
            "type": "u8"
          },
          {
            "name": "existingPositionDirection",
            "type": {
              "defined": {
                "name": "positionDirection"
              }
            }
          },
          {
            "name": "direction",
            "type": {
              "defined": {
                "name": "positionDirection"
              }
            }
          },
          {
            "name": "reduceOnly",
            "type": "bool"
          },
          {
            "name": "postOnly",
            "type": "bool"
          },
          {
            "name": "immediateOrCancel",
            "type": "bool"
          },
          {
            "name": "triggerCondition",
            "type": {
              "defined": {
                "name": "orderTriggerCondition"
              }
            }
          },
          {
            "name": "auctionDuration",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "orderFillerRewardStructure",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rewardNumerator",
            "type": "u32"
          },
          {
            "name": "rewardDenominator",
            "type": "u32"
          },
          {
            "name": "timeBasedRewardLowerBound",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "orderStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "init"
          },
          {
            "name": "open"
          },
          {
            "name": "filled"
          },
          {
            "name": "canceled"
          }
        ]
      }
    },
    {
      "name": "orderTriggerCondition",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "above"
          },
          {
            "name": "below"
          },
          {
            "name": "triggeredAbove"
          },
          {
            "name": "triggeredBelow"
          }
        ]
      }
    },
    {
      "name": "orderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "market"
          },
          {
            "name": "limit"
          },
          {
            "name": "triggerMarket"
          },
          {
            "name": "triggerLimit"
          },
          {
            "name": "oracle"
          }
        ]
      }
    },
    {
      "name": "perpPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastCumulativeFundingRate",
            "type": "i64"
          },
          {
            "name": "baseAssetAmount",
            "type": "i64"
          },
          {
            "name": "quoteAssetAmount",
            "type": "i64"
          },
          {
            "name": "quoteBreakEvenAmount",
            "type": "i64"
          },
          {
            "name": "quoteEntryAmount",
            "type": "i64"
          },
          {
            "name": "openBids",
            "type": "i64"
          },
          {
            "name": "openAsks",
            "type": "i64"
          },
          {
            "name": "settledPnl",
            "type": "i64"
          },
          {
            "name": "lpShares",
            "type": "u64"
          },
          {
            "name": "lastBaseAssetAmountPerLp",
            "type": "i64"
          },
          {
            "name": "lastQuoteAssetAmountPerLp",
            "type": "i64"
          },
          {
            "name": "remainderBaseAssetAmount",
            "type": "i32"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "openOrders",
            "type": "u8"
          },
          {
            "name": "perLpBase",
            "type": "i8"
          }
        ]
      }
    },
    {
      "name": "positionDirection",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "long"
          },
          {
            "name": "short"
          }
        ]
      }
    },
    {
      "name": "priceDivergenceGuardRails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "markOraclePercentDivergence",
            "type": "u64"
          },
          {
            "name": "oracleTwap5MinPercentDivergence",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "spotBalanceType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "deposit"
          },
          {
            "name": "borrow"
          }
        ]
      }
    },
    {
      "name": "spotPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "scaledBalance",
            "type": "u64"
          },
          {
            "name": "openBids",
            "type": "i64"
          },
          {
            "name": "openAsks",
            "type": "i64"
          },
          {
            "name": "cumulativeDeposits",
            "type": "i64"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "balanceType",
            "type": {
              "defined": {
                "name": "spotBalanceType"
              }
            }
          },
          {
            "name": "openOrders",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "whitelistMint",
            "type": "pubkey"
          },
          {
            "name": "discountMint",
            "type": "pubkey"
          },
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "srmVault",
            "type": "pubkey"
          },
          {
            "name": "perpFeeStructure",
            "type": {
              "defined": {
                "name": "feeStructure"
              }
            }
          },
          {
            "name": "spotFeeStructure",
            "type": {
              "defined": {
                "name": "feeStructure"
              }
            }
          },
          {
            "name": "oracleGuardRails",
            "type": {
              "defined": {
                "name": "oracleGuardRails"
              }
            }
          },
          {
            "name": "numberOfAuthorities",
            "type": "u64"
          },
          {
            "name": "numberOfSubAccounts",
            "type": "u64"
          },
          {
            "name": "lpCooldownTime",
            "type": "u64"
          },
          {
            "name": "liquidationMarginBufferRatio",
            "type": "u32"
          },
          {
            "name": "settlementDuration",
            "type": "u16"
          },
          {
            "name": "numberOfMarkets",
            "type": "u16"
          },
          {
            "name": "numberOfSpotMarkets",
            "type": "u16"
          },
          {
            "name": "signerNonce",
            "type": "u8"
          },
          {
            "name": "minPerpAuctionDuration",
            "type": "u8"
          },
          {
            "name": "defaultMarketOrderTimeInForce",
            "type": "u8"
          },
          {
            "name": "defaultSpotAuctionDuration",
            "type": "u8"
          },
          {
            "name": "exchangeStatus",
            "type": "u8"
          },
          {
            "name": "liquidationDuration",
            "type": "u8"
          },
          {
            "name": "initialPctToLiquidate",
            "type": "u16"
          },
          {
            "name": "maxNumberOfSubAccounts",
            "type": "u16"
          },
          {
            "name": "maxInitializeUserFee",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "delegate",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "spotPositions",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "spotPosition"
                  }
                },
                8
              ]
            }
          },
          {
            "name": "perpPositions",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "perpPosition"
                  }
                },
                8
              ]
            }
          },
          {
            "name": "orders",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "order"
                  }
                },
                32
              ]
            }
          },
          {
            "name": "lastAddPerpLpSharesTs",
            "type": "i64"
          },
          {
            "name": "totalDeposits",
            "type": "u64"
          },
          {
            "name": "totalWithdraws",
            "type": "u64"
          },
          {
            "name": "totalSocialLoss",
            "type": "u64"
          },
          {
            "name": "settledPerpPnl",
            "type": "i64"
          },
          {
            "name": "cumulativeSpotFees",
            "type": "i64"
          },
          {
            "name": "cumulativePerpFunding",
            "type": "i64"
          },
          {
            "name": "liquidationMarginFreed",
            "type": "u64"
          },
          {
            "name": "lastActiveSlot",
            "type": "u64"
          },
          {
            "name": "nextOrderId",
            "type": "u32"
          },
          {
            "name": "maxMarginRatio",
            "type": "u32"
          },
          {
            "name": "nextLiquidationId",
            "type": "u16"
          },
          {
            "name": "subAccountId",
            "type": "u16"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "isMarginTradingEnabled",
            "type": "bool"
          },
          {
            "name": "idle",
            "type": "bool"
          },
          {
            "name": "openOrders",
            "type": "u8"
          },
          {
            "name": "hasOpenOrder",
            "type": "bool"
          },
          {
            "name": "openAuctions",
            "type": "u8"
          },
          {
            "name": "hasOpenAuction",
            "type": "bool"
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u8",
                5
              ]
            }
          },
          {
            "name": "lastFuelBonusUpdateTs",
            "type": "u32"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                12
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userFees",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalFeePaid",
            "type": "u64"
          },
          {
            "name": "totalFeeRebate",
            "type": "u64"
          },
          {
            "name": "totalTokenDiscount",
            "type": "u64"
          },
          {
            "name": "totalRefereeDiscount",
            "type": "u64"
          },
          {
            "name": "totalReferrerReward",
            "type": "u64"
          },
          {
            "name": "currentEpochReferrerReward",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "referrer",
            "type": "pubkey"
          },
          {
            "name": "fees",
            "type": {
              "defined": {
                "name": "userFees"
              }
            }
          },
          {
            "name": "nextEpochTs",
            "type": "i64"
          },
          {
            "name": "makerVolume30D",
            "type": "u64"
          },
          {
            "name": "takerVolume30D",
            "type": "u64"
          },
          {
            "name": "fillerVolume30D",
            "type": "u64"
          },
          {
            "name": "lastMakerVolume30DTs",
            "type": "i64"
          },
          {
            "name": "lastTakerVolume30DTs",
            "type": "i64"
          },
          {
            "name": "lastFillerVolume30DTs",
            "type": "i64"
          },
          {
            "name": "ifStakedQuoteAssetAmount",
            "type": "u64"
          },
          {
            "name": "numberOfSubAccounts",
            "type": "u16"
          },
          {
            "name": "numberOfSubAccountsCreated",
            "type": "u16"
          },
          {
            "name": "isReferrer",
            "type": "bool"
          },
          {
            "name": "disableUpdatePerpBidAskTwap",
            "type": "bool"
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "fuelInsurance",
            "type": "u32"
          },
          {
            "name": "fuelDeposits",
            "type": "u32"
          },
          {
            "name": "fuelBorrows",
            "type": "u32"
          },
          {
            "name": "fuelPositions",
            "type": "u32"
          },
          {
            "name": "fuelTaker",
            "type": "u32"
          },
          {
            "name": "fuelMaker",
            "type": "u32"
          },
          {
            "name": "ifStakedGovTokenAmount",
            "type": "u64"
          },
          {
            "name": "lastFuelIfBonusUpdateTs",
            "type": "u32"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                12
              ]
            }
          }
        ]
      }
    },
    {
      "name": "validityGuardRails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slotsBeforeStaleForAmm",
            "type": "i64"
          },
          {
            "name": "slotsBeforeStaleForMargin",
            "type": "i64"
          },
          {
            "name": "confidenceIntervalMaxSize",
            "type": "u64"
          },
          {
            "name": "tooVolatileRatio",
            "type": "i64"
          }
        ]
      }
    },
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
    },
    {
      "name": "wsolMintAddress",
      "type": "pubkey",
      "value": "So11111111111111111111111111111111111111112"
    }
  ]
};
