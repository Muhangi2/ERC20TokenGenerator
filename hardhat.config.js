require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { task } = require("hardhat/config");

// Validate that the required environment variables are defined
const { NEXT_PUBLIC_POLYGON_AMOY_RPC, POLYGON_AMOY_PRIVATE_KEY } = process.env;
if (!NEXT_PUBLIC_POLYGON_AMOY_RPC || !POLYGON_AMOY_PRIVATE_KEY) {
  throw new Error(
    "Please set your NEXT_PUBLIC_POLYGON_AMOY_RPC and POLYGON_AMOY_PRIVATE_KEY in a .env file"
  );
}

module.exports = {
  solidity: "0.8.19",
  networks: {
    polygon_amoy: {
      url:"https://polygon-amoy.g.alchemy.com/v2/3Ibg6qMaI4LdrWrSxLpXPbqNUALAzIwq",
      accounts: ["bce8a15dd364a66eed23a08411c3e59c8ba39fb25867a9baf4256ebe72ec5f2b"],
    },
  },
};
