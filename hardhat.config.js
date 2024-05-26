require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const NEXT_PUBLIC_POLYGON_AMOY_RPC=
  "https://polygon-amoy.g.alchemy.com/v2/3Ibg6qMaI4LdrWrSxLpXPbqNUALAzIwq";
  https://polygon-amoy.g.alchemy.com/v2/3Ibg6qMaI4LdrWrSxLpXPbqNUALAzIwq
module.exports = {
  solidity: "0.8.19",
  networks: {
    polygon_amoy: {
      url: NEXT_PUBLIC_POLYGON_AMOY_RPC,
      accounts: [process.env.polygon_amoy_private_key],
    },
  },
};
