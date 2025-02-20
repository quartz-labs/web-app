<div align="center">
  <img width="2500" alt="Quartz" src="https://cdn.prod.website-files.com/67504dd7fde047775f88c355/67b380029cf6f3d8e10349bf_docs_banner.jpg" />

  <h1 style="margin-top:20px;">Quartz SDK</h1>
</div>

Typescript SDK for interacting with the Quartz Protocol. 

Install using:

```bash
yarn add @quartz-labs/sdk
# or
npm install @quartz-labs/sdk
```

There is currently an issue with dependancy resolutions, so add the following to your package.json to fix:

```json
"resolutions": {
  "rpc-websockets": "^9.0.4",
  "@solana/web3.js": "^1.95.8"
}
```

If you want to use this SDK in a front-end, note that some Node modules don't work in the browser. Because of this, you'll normally want to import the SDK in your client side code like this:

```javascript
import * from "@quartz-labs/sdk/browser";
```

Server-side code can still be imported without the /browser path at the end, but you may need to set up your config so your web app doesn't try to bundle the problematic Node modules with the and client side code.

## Basic setup

Create a Quartz Client with:

```javascript
import { QuartzClient } from "@quartz-labs/sdk";
import { Connection } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const client = QuartzClient.fetchClient(connection);
```

The majority of this SDK can then be accessed through the client, eg:

```javascript
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const depositApy = client.getDepositRate(marketIndex);
const createAccountInstructions = client.makeInitQuartzUserIxs(address);

const user = client.getQuartzAccount(address);
const health = user.getHealth();
const stablecoinBalances = user.getMultipleTokenBalances(stablecoinIndices);
const depositInstructions = user.makeDepositIx(
  LAMPORTS_PER_SOL,
  marketIndexSol,
  true // true = can change position from loan <-> collateral, false = will limit amount deposited to prevent this
);
```

## Links

Website and waitlist: [quartzpay.io](https://quartzpay.io/)

Docs: [docs.quartzpay.io](https://docs.quartzpay.io/)

X: [@quartzpay](https://x.com/quartzpay)

Contact: [iarla@quartzpay.io](mailto:diego@quartzpay.io)
