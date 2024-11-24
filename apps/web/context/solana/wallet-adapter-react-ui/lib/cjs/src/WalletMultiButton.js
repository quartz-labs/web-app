"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletMultiButton = WalletMultiButton;
const react_1 = __importDefault(require("react"));
const BaseWalletMultiButton_1 = require("./BaseWalletMultiButton");
const LABELS = {
  "change-wallet": "Close account",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Select Wallet",
};
function WalletMultiButton(props) {
  return react_1.default.createElement(
    BaseWalletMultiButton_1.BaseWalletMultiButton,
    Object.assign({}, props, { labels: LABELS }),
  );
}
//# sourceMappingURL=WalletMultiButton.js.map
