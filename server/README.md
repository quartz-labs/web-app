# README file
# - Quartz Server
This server is used to query defi protocols for user account data.

At the moment it is only used to query drift balances.
# - Setup instructions

1. Install dependencies:
```
npm install
```
2. Create a .env file and add the following:
```
SECRET=[your-secret-key]
HELIUS_RPC_URL=[your-helius-rpc-url]
```
3. Start the server:
```
npm start
```