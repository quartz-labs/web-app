import { readFileSync, writeFileSync } from "fs";
import { Idl } from "@coral-xyz/anchor";
import * as path from "path";

interface ExtendedIdl extends Idl {
    name: string;
    version: string;
}

// Read and parse the JSON file
const idlPath = path.join(process.cwd(), "marginfi.json");
const idl: ExtendedIdl = JSON.parse(
    readFileSync(idlPath, "utf-8")
);

const types = `export type ${idl.name}Types = {
  accounts: {
    ${idl.accounts?.map(acc => `${acc.name}: ${JSON.stringify(acc)}`).join(',\n    ')}
  },
  instructions: {
    ${idl.instructions?.map(ix => `${ix.name}: ${JSON.stringify(ix)}`).join(',\n    ')}
  },
  types: {
    ${idl.types?.map(type => `${type.name}: ${JSON.stringify(type)}`).join(',\n    ')}
  }
}`;

writeFileSync("./web-app/types/marginfi.ts", types);