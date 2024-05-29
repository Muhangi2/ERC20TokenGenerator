require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const NEXT_PUBLIC_POLYGON_AMOY_RPC =
  "https://polygon-amoy.g.alchemy.com/v2/3Ibg6qMaI4LdrWrSxLpXPbqNUALAzIwq";
//polygon-amoy.g.alchemy.com/v2/3Ibg6qMaI4LdrWrSxLpXPbqNUALAzIwq
https: module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // polygon_amoy: {
    //   url: NEXT_PUBLIC_POLYGON_AMOY_RPC,
    //   accounts: [process.env.polygon_amoy_private_key],
    // },
  },
};
