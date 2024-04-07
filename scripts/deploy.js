const hre = require("hardhat");

const tokens = (_number) => {
  return ethers.utils.parseUnits(_number.toString(), "ether");
};

async function main() {
  const _tokenName = "ELIOD";
  const _tokenSymbol = "ELD";
  const _totalSupply = tokens(1000);

  const ERC20Generator = await hre.ethers.getContractFactory("ERC20Generator");
  const erc20Generator = await ERC20Generator.deploy(
    _tokenName,
    _tokenSymbol,
    _totalSupply
  );
  await erc20Generator.deployed();
  console.log("ERC20Generator deployed to:", erc20Generator.address);

  const LookUpContract = await hre.ethers.getContractFactory("LookUpContract");
  const lookUpContract = await LookUpContract.deploy();
  await lookUpContract.deployed();
  console.log("LookUpContract deployed to:", lookUpContract.address);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
