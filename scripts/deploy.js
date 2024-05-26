const hre = require("hardhat");

const tokens = (_number) => {
  return ethers.utils.parseUnits(_number.toString(), "ether");
};

async function main() {
  const _initialSupply = tokens(10000);
  const _tokenName = "ELD";
  const _tokenSymbol = "ELD";

  const ERC20Generator = await hre.ethers.getContractFactory("ERC20Generator");
  const erc20Generator = await ERC20Generator.deploy(
    _initialSupply,
    _tokenName,
    _tokenSymbol
  );

  await erc20Generator.deployed();
  console.log("ERC20Generator deployed to:", erc20Generator.address);

  const LookUpContract = await hre.ethers.getContractFactory("LookUpContract");
  const lookUpContract = await LookUpContract.deploy();
  await lookUpContract.deployed();
  console.log("LookUpContract deployed to:", lookUpContract.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error("Error deploying contracts:", error);
    process.exit(1);
  }
};

runMain();
