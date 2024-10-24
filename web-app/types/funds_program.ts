/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/funds_program.json`.
 */
export type FundsProgram = {
  "address": "6JjHXLheGSNvvexgzMthEcgjkcirDrGduc3HAKB2P1v2",
  "metadata": {
    "name": "fundsProgram",
    "version": "0.0.2",
    "spec": "0.1.0",
    "description": "Quartz funds program"
  },
  "instructions": [
    {
      "name": "closeDriftAccount",
      "discriminator": [
        169,
        249,
        195,
        120,
        206,
        79,
        144,
        236
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
          "name": "driftUser",
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
          "name": "driftUserStats",
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
          "name": "driftState",
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
        }
      ],
      "args": []
    },
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
      "name": "deposit",
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
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
          "name": "vaultSpl",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "splMint"
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
          "name": "ownerSpl",
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
                "path": "splMint"
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
          "name": "driftState",
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
          "name": "driftUser",
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
          "name": "driftUserStats",
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
                "kind": "arg",
                "path": "driftMarketIndex"
              }
            ],
            "program": {
              "kind": "account",
              "path": "driftProgram"
            }
          }
        },
        {
          "name": "splMint"
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountBaseUnits",
          "type": "u64"
        },
        {
          "name": "driftMarketIndex",
          "type": "u16"
        },
        {
          "name": "reduceOnly",
          "type": "bool"
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
          "name": "driftUser",
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
          "name": "driftUserStats",
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
          "name": "driftState",
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
      "name": "withdraw",
      "discriminator": [
        183,
        18,
        70,
        156,
        148,
        109,
        161,
        34
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
          "name": "vaultSpl",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "splMint"
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
          "name": "ownerSpl",
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
                "path": "splMint"
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
          "name": "driftState",
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
          "name": "driftUser",
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
          "name": "driftUserStats",
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
                "kind": "arg",
                "path": "driftMarketIndex"
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
          "name": "splMint"
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountBaseUnits",
          "type": "u64"
        },
        {
          "name": "driftMarketIndex",
          "type": "u16"
        },
        {
          "name": "reduceOnly",
          "type": "bool"
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
      "name": "invalidDriftProgram",
      "msg": "Invalid Drift program address"
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
      "repr": {
        "kind": "rust"
      },
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
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slot",
            "docs": [
              "The slot the order was placed"
            ],
            "type": "u64"
          },
          {
            "name": "price",
            "docs": [
              "The limit price for the order (can be 0 for market orders)",
              "For orders with an auction, this price isn't used until the auction is complete",
              "precision: PRICE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "baseAssetAmount",
            "docs": [
              "The size of the order",
              "precision for perps: BASE_PRECISION",
              "precision for spot: token mint precision"
            ],
            "type": "u64"
          },
          {
            "name": "baseAssetAmountFilled",
            "docs": [
              "The amount of the order filled",
              "precision for perps: BASE_PRECISION",
              "precision for spot: token mint precision"
            ],
            "type": "u64"
          },
          {
            "name": "quoteAssetAmountFilled",
            "docs": [
              "The amount of quote filled for the order",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "triggerPrice",
            "docs": [
              "At what price the order will be triggered. Only relevant for trigger orders",
              "precision: PRICE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "auctionStartPrice",
            "docs": [
              "The start price for the auction. Only relevant for market/oracle orders",
              "precision: PRICE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "auctionEndPrice",
            "docs": [
              "The end price for the auction. Only relevant for market/oracle orders",
              "precision: PRICE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "maxTs",
            "docs": [
              "The time when the order will expire"
            ],
            "type": "i64"
          },
          {
            "name": "oraclePriceOffset",
            "docs": [
              "If set, the order limit price is the oracle price + this offset",
              "precision: PRICE_PRECISION"
            ],
            "type": "i32"
          },
          {
            "name": "orderId",
            "docs": [
              "The id for the order. Each users has their own order id space"
            ],
            "type": "u32"
          },
          {
            "name": "marketIndex",
            "docs": [
              "The perp/spot market index"
            ],
            "type": "u16"
          },
          {
            "name": "status",
            "docs": [
              "Whether the order is open or unused"
            ],
            "type": {
              "defined": {
                "name": "orderStatus"
              }
            }
          },
          {
            "name": "orderType",
            "docs": [
              "The type of order"
            ],
            "type": {
              "defined": {
                "name": "orderType"
              }
            }
          },
          {
            "name": "marketType",
            "docs": [
              "Whether market is spot or perp"
            ],
            "type": {
              "defined": {
                "name": "marketType"
              }
            }
          },
          {
            "name": "userOrderId",
            "docs": [
              "User generated order id. Can make it easier to place/cancel orders"
            ],
            "type": "u8"
          },
          {
            "name": "existingPositionDirection",
            "docs": [
              "What the users position was when the order was placed"
            ],
            "type": {
              "defined": {
                "name": "positionDirection"
              }
            }
          },
          {
            "name": "direction",
            "docs": [
              "Whether the user is going long or short. LONG = bid, SHORT = ask"
            ],
            "type": {
              "defined": {
                "name": "positionDirection"
              }
            }
          },
          {
            "name": "reduceOnly",
            "docs": [
              "Whether the order is allowed to only reduce position size"
            ],
            "type": "bool"
          },
          {
            "name": "postOnly",
            "docs": [
              "Whether the order must be a maker"
            ],
            "type": "bool"
          },
          {
            "name": "immediateOrCancel",
            "docs": [
              "Whether the order must be canceled the same slot it is placed"
            ],
            "type": "bool"
          },
          {
            "name": "triggerCondition",
            "docs": [
              "Whether the order is triggered above or below the trigger price. Only relevant for trigger orders"
            ],
            "type": {
              "defined": {
                "name": "orderTriggerCondition"
              }
            }
          },
          {
            "name": "auctionDuration",
            "docs": [
              "How many slots the auction lasts"
            ],
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
      "repr": {
        "kind": "rust"
      },
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
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastCumulativeFundingRate",
            "docs": [
              "The perp market's last cumulative funding rate. Used to calculate the funding payment owed to user",
              "precision: FUNDING_RATE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "baseAssetAmount",
            "docs": [
              "the size of the users perp position",
              "precision: BASE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "quoteAssetAmount",
            "docs": [
              "Used to calculate the users pnl. Upon entry, is equal to base_asset_amount * avg entry price - fees",
              "Updated when the user open/closes position or settles pnl. Includes fees/funding",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "quoteBreakEvenAmount",
            "docs": [
              "The amount of quote the user would need to exit their position at to break even",
              "Updated when the user open/closes position or settles pnl. Includes fees/funding",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "quoteEntryAmount",
            "docs": [
              "The amount quote the user entered the position with. Equal to base asset amount * avg entry price",
              "Updated when the user open/closes position. Excludes fees/funding",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "openBids",
            "docs": [
              "The amount of open bids the user has in this perp market",
              "precision: BASE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "openAsks",
            "docs": [
              "The amount of open asks the user has in this perp market",
              "precision: BASE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "settledPnl",
            "docs": [
              "The amount of pnl settled in this market since opening the position",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "lpShares",
            "docs": [
              "The number of lp (liquidity provider) shares the user has in this perp market",
              "LP shares allow users to provide liquidity via the AMM",
              "precision: BASE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "lastBaseAssetAmountPerLp",
            "docs": [
              "The last base asset amount per lp the amm had",
              "Used to settle the users lp position",
              "precision: BASE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "lastQuoteAssetAmountPerLp",
            "docs": [
              "The last quote asset amount per lp the amm had",
              "Used to settle the users lp position",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "remainderBaseAssetAmount",
            "docs": [
              "Settling LP position can lead to a small amount of base asset being left over smaller than step size",
              "This records that remainder so it can be settled later on",
              "precision: BASE_PRECISION"
            ],
            "type": "i32"
          },
          {
            "name": "marketIndex",
            "docs": [
              "The market index for the perp market"
            ],
            "type": "u16"
          },
          {
            "name": "openOrders",
            "docs": [
              "The number of open orders"
            ],
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
            "name": "oracleTwap5minPercentDivergence",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "spotBalanceType",
      "repr": {
        "kind": "rust"
      },
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
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "scaledBalance",
            "docs": [
              "The scaled balance of the position. To get the token amount, multiply by the cumulative deposit/borrow",
              "interest of corresponding market.",
              "precision: SPOT_BALANCE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "openBids",
            "docs": [
              "How many spot bids the user has open",
              "precision: token mint precision"
            ],
            "type": "i64"
          },
          {
            "name": "openAsks",
            "docs": [
              "How many spot asks the user has open",
              "precision: token mint precision"
            ],
            "type": "i64"
          },
          {
            "name": "cumulativeDeposits",
            "docs": [
              "The cumulative deposits/borrows a user has made into a market",
              "precision: token mint precision"
            ],
            "type": "i64"
          },
          {
            "name": "marketIndex",
            "docs": [
              "The market index of the corresponding spot market"
            ],
            "type": "u16"
          },
          {
            "name": "balanceType",
            "docs": [
              "Whether the position is deposit or borrow"
            ],
            "type": {
              "defined": {
                "name": "spotBalanceType"
              }
            }
          },
          {
            "name": "openOrders",
            "docs": [
              "Number of open orders"
            ],
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
      "repr": {
        "kind": "c"
      },
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
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The owner/authority of the account"
            ],
            "type": "pubkey"
          },
          {
            "name": "delegate",
            "docs": [
              "An addresses that can control the account on the authority's behalf. Has limited power, cant withdraw"
            ],
            "type": "pubkey"
          },
          {
            "name": "name",
            "docs": [
              "Encoded display name e.g. \"toly\""
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "spotPositions",
            "docs": [
              "The user's spot positions"
            ],
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
            "docs": [
              "The user's perp positions"
            ],
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
            "docs": [
              "The user's orders"
            ],
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
            "docs": [
              "The last time the user added perp lp positions"
            ],
            "type": "i64"
          },
          {
            "name": "totalDeposits",
            "docs": [
              "The total values of deposits the user has made",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalWithdraws",
            "docs": [
              "The total values of withdrawals the user has made",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalSocialLoss",
            "docs": [
              "The total socialized loss the users has incurred upon the protocol",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "settledPerpPnl",
            "docs": [
              "Fees (taker fees, maker rebate, referrer reward, filler reward) and pnl for perps",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "cumulativeSpotFees",
            "docs": [
              "Fees (taker fees, maker rebate, filler reward) for spot",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "cumulativePerpFunding",
            "docs": [
              "Cumulative funding paid/received for perps",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "liquidationMarginFreed",
            "docs": [
              "The amount of margin freed during liquidation. Used to force the liquidation to occur over a period of time",
              "Defaults to zero when not being liquidated",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "lastActiveSlot",
            "docs": [
              "The last slot a user was active. Used to determine if a user is idle"
            ],
            "type": "u64"
          },
          {
            "name": "nextOrderId",
            "docs": [
              "Every user order has an order id. This is the next order id to be used"
            ],
            "type": "u32"
          },
          {
            "name": "maxMarginRatio",
            "docs": [
              "Custom max initial margin ratio for the user"
            ],
            "type": "u32"
          },
          {
            "name": "nextLiquidationId",
            "docs": [
              "The next liquidation id to be used for user"
            ],
            "type": "u16"
          },
          {
            "name": "subAccountId",
            "docs": [
              "The sub account id for this user"
            ],
            "type": "u16"
          },
          {
            "name": "status",
            "docs": [
              "Whether the user is active, being liquidated or bankrupt"
            ],
            "type": "u8"
          },
          {
            "name": "isMarginTradingEnabled",
            "docs": [
              "Whether the user has enabled margin trading"
            ],
            "type": "bool"
          },
          {
            "name": "idle",
            "docs": [
              "User is idle if they haven't interacted with the protocol in 1 week and they have no orders, perp positions or borrows",
              "Off-chain keeper bots can ignore users that are idle"
            ],
            "type": "bool"
          },
          {
            "name": "openOrders",
            "docs": [
              "number of open orders"
            ],
            "type": "u8"
          },
          {
            "name": "hasOpenOrder",
            "docs": [
              "Whether or not user has open order"
            ],
            "type": "bool"
          },
          {
            "name": "openAuctions",
            "docs": [
              "number of open orders with auction"
            ],
            "type": "u8"
          },
          {
            "name": "hasOpenAuction",
            "docs": [
              "Whether or not user has open order with auction"
            ],
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
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalFeePaid",
            "docs": [
              "Total taker fee paid",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalFeeRebate",
            "docs": [
              "Total maker fee rebate",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalTokenDiscount",
            "docs": [
              "Total discount from holding token",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalRefereeDiscount",
            "docs": [
              "Total discount from being referred",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalReferrerReward",
            "docs": [
              "Total reward to referrer",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "currentEpochReferrerReward",
            "docs": [
              "Total reward to referrer this epoch",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userStats",
      "serialization": "bytemuckunsafe",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The authority for all of a users sub accounts"
            ],
            "type": "pubkey"
          },
          {
            "name": "referrer",
            "docs": [
              "The address that referred this user"
            ],
            "type": "pubkey"
          },
          {
            "name": "fees",
            "docs": [
              "Stats on the fees paid by the user"
            ],
            "type": {
              "defined": {
                "name": "userFees"
              }
            }
          },
          {
            "name": "nextEpochTs",
            "docs": [
              "The timestamp of the next epoch",
              "Epoch is used to limit referrer rewards earned in single epoch"
            ],
            "type": "i64"
          },
          {
            "name": "makerVolume30d",
            "docs": [
              "Rolling 30day maker volume for user",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "takerVolume30d",
            "docs": [
              "Rolling 30day taker volume for user",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "fillerVolume30d",
            "docs": [
              "Rolling 30day filler volume for user",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "lastMakerVolume30dTs",
            "docs": [
              "last time the maker volume was updated"
            ],
            "type": "i64"
          },
          {
            "name": "lastTakerVolume30dTs",
            "docs": [
              "last time the taker volume was updated"
            ],
            "type": "i64"
          },
          {
            "name": "lastFillerVolume30dTs",
            "docs": [
              "last time the filler volume was updated"
            ],
            "type": "i64"
          },
          {
            "name": "ifStakedQuoteAssetAmount",
            "docs": [
              "The amount of tokens staked in the quote spot markets if"
            ],
            "type": "u64"
          },
          {
            "name": "numberOfSubAccounts",
            "docs": [
              "The current number of sub accounts"
            ],
            "type": "u16"
          },
          {
            "name": "numberOfSubAccountsCreated",
            "docs": [
              "The number of sub accounts created. Can be greater than the number of sub accounts if user",
              "has deleted sub accounts"
            ],
            "type": "u16"
          },
          {
            "name": "isReferrer",
            "docs": [
              "Whether the user is a referrer. Sub account 0 can not be deleted if user is a referrer"
            ],
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
            "docs": [
              "accumulated fuel for token amounts of insurance"
            ],
            "type": "u32"
          },
          {
            "name": "fuelDeposits",
            "docs": [
              "accumulated fuel for notional of deposits"
            ],
            "type": "u32"
          },
          {
            "name": "fuelBorrows",
            "docs": [
              "accumulate fuel bonus for notional of borrows"
            ],
            "type": "u32"
          },
          {
            "name": "fuelPositions",
            "docs": [
              "accumulated fuel for perp open interest"
            ],
            "type": "u32"
          },
          {
            "name": "fuelTaker",
            "docs": [
              "accumulate fuel bonus for taker volume"
            ],
            "type": "u32"
          },
          {
            "name": "fuelMaker",
            "docs": [
              "accumulate fuel bonus for maker volume"
            ],
            "type": "u32"
          },
          {
            "name": "ifStakedGovTokenAmount",
            "docs": [
              "The amount of tokens staked in the governance spot markets if"
            ],
            "type": "u64"
          },
          {
            "name": "lastFuelIfBonusUpdateTs",
            "docs": [
              "last unix ts user stats data was used to update if fuel (u32 to save space)"
            ],
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
  ]
};
