require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC =
  "https://polygon-mumbai.g.alchemy.com/v2/gRfh9yz8D_BJIgisJjViZ4VRppwhLSxG";

module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [process.env.MUMBAI_PRIVATE_KEY],
    },
  },
};
