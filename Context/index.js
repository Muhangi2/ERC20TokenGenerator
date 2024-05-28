import { useEffect, useState, useContext, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import {
  checkIfWalletIsConnected,
  connectingToLookUpContract,
  connectingTokenContract,
  getBalanace,
} from "../Utils";

import { ERC20Generator_ABI, ERC20Generator_BYTECODE } from "./constants";

export const StateContext = createContext();

const StateContextprovider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [getAllERC20Listed, setGetAllERC20Listed] = useState([]);
  const [getUserERC20Listed, setGetUserERC20Listed] = useState([]);
  const [getAllDonation, setGetAllDonation] = useState([]);
  const [fee, setFee] = useState(); //tinakakyenga
  const [balance, setBalance] = useState();
  const [mainBalance, setMainBalance] = useState();
  const [nativeToken, setNativeToken] = useState();

  ///fuction to get alll the data
  const fetchInitialData = async () => {
    try {
  const account = await checkIfWalletIsConnected();
  setAddress(account);

  const balance = await getBalanace(account);
  setBalance(ethers.utils.formatEther(balance.toString()));

  const nativeContract = await connectingTokenContract();
  if (account) {
    const nativeBalance = await nativeContract.balanceOf(account);
    const nativeName = await nativeContract.name();
    const nativeSymbol = await nativeContract.symbol();
    const nativeDecimals = await nativeContract.decimals();
    const nativeTotalSupply = await nativeContract.totalSupply();
    const nativeTokenAdress = nativeContract.address;
    const nativeTokenn = {
      balance: ethers.utils.formatUnits(nativeBalance.toString(), nativeDecimals),
      name: nativeName,
      address: nativeTokenAdress,
      symbol: nativeSymbol,
      decimals: nativeDecimals,
      totalSupply: ethers.utils.formatUnits(nativeTotalSupply.toString(), nativeDecimals),
    };
    setNativeToken(nativeTokenn);
    console.log(nativeContract, "nativetokennn");
  }

  // Get contract instance
  const loopUpcontract = await connectingToLookUpContract();

  // Get contract balance
  if (account === "0x1633B8595ed0847993801600C68e635FB32724D7") {
    const contractBalance = await loopUpcontract.getContractBalance();
    const mainBalance = ethers.utils.formatUnits(contractBalance.toString());
    console.log(mainBalance);
    setMainBalance(mainBalance);
  }

  // Get all ERC20 tokens
  const getAllErcTokenList = await loopUpcontract.getAllERC20TokenListed();
  console.log(getAllErcTokenList, "all token");
  const parseToken = getAllErcTokenList.map((ERC20token) => ({
    tokenId: ERC20token.tokenId.toNumber(),
    owner: ERC20token.owner,
    tokenSupply: ERC20token.tokenSupply,
    tokenName: ERC20token.tokenName,
    tokenSymbol: ERC20token.tokenSymbol,
    tokenAddress: ERC20token.tokenAddress,
    tokenTransactionHash: ERC20token.TokenTransactionHash,
    tokenCreatedDate: ERC20token.tokenCreatedDate,
  }));
  setGetAllERC20Listed(parseToken);

  // Get user ERC20 tokens
  if (account) {
    const getUserTokenList = await loopUpcontract.getUserTokens(account);
    const parseUserToken = getUserTokenList.map((ERC20token) => ({
      tokenId: ERC20token.tokenId.toNumber(),
      owner: ERC20token.owner,
      tokenSupply: ERC20token.tokenSupply,
      tokenName: ERC20token.tokenName,
      tokenSymbol: ERC20token.tokenSymbol,
      tokenAddress: ERC20token.tokenAddress,
      tokenTransactionHash: ERC20token.TokenTransactionHash,
      tokenCreatedDate: ERC20token.tokenCreatedDate,
    }));
    setGetUserERC20Listed(parseUserToken);
  }

  // Listing price
  const listingprice = await loopUpcontract.getListingPrice();
  const price = ethers.utils.formatEther(listingprice.toString());
  setFee(price);

  // Donations
  const allDonation = await loopUpcontract.getDonations();
  const parseDonation = allDonation.map((donation) => ({
    donationId: donation.donationId.toNumber(),
    donor: donation.donor,
    amount: ethers.utils.formatUnits(donation.amount.toString(), "ether"),
  }));
  setGetAllDonation(parseDonation);
} catch (error) {
  console.log(error);
}

  };
  useEffect(() => {
    fetchInitialData();
  }, []);

  //deploy contract
  const _deployContract = async (signer, account, name, symbol, supply) => {
    console.log(name, symbol, supply);

    try {
      const factory = new ethers.ContractFactory(
        ERC20Generator_ABI,
        ERC20Generator_BYTECODE,
        signer
      );
      const totalSupply = Number(supply);
      const _initialSupply = ethers.utils.parseEther(
        totalSupply.toString(),
        "ether"
      );

      let contract = await factory.deploy(_initialSupply, name, symbol);
      await contract.deployed();

      const _tokenCreatedDate = new Date().toISOString();

      if (contract.address) {
        await createERC20Token(
          account,
          name,
          symbol,
          supply.toString(),
          contract.address,
          contract.deployTransaction.hash,
          _tokenCreatedDate
        );
      }
    } catch (error) {
      console.error(error);
      throw error; // Re-throwing the error after logging
    }
  };

  const createERC20Token = async (
    supply,
    name,
    symbol,
    tokenAddress,
    TokenTransactionHash,
    tokenCreatedDate
  ) => {
    try {
      const loopUpcontract = await connectingToLookUpContract();
      console.log(loopUpcontract, "looping...");

      // Fetch the listing price
      const listingprice = await loopUpcontract.getAllERC20TokenListed();
      console.log("Listing price:", listingprice);

      // Ensure listing price is a valid BigNumber or string
      const price = ethers.BigNumber.from(listingprice.toString());

      // Create the ERC20 token
      const transaction = await loopUpcontract.createERC20Token(
        r,
        supply,
        name,
        symbol,
        tokenAddress,
        TokenTransactionHash,
        tokenCreatedDate,
        {
          value: price,
        }
      );

      // Wait for the transaction to be mined
      await transaction.wait();
      console.log("transaction", transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const createERC20 = async (token) => {
    const { name, symbol, supply } = token;
    console.log(name, symbol, Number(supply));
    try {
      if ((!name, !symbol, !supply)) {
        console.log(token);
      } else {
        console.log(name, symbol, Number(supply));
        const account = await checkIfWalletIsConnected();
        console.log(account);

        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        _deployContract(signer, account, name, symbol, supply);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawfunds = async () => {
    try {
      const LookUpContract = await connectingToLookUpContract();
      const withdraw = LookUpContract.withdraw();
      await withdraw.wait();
      console.log("withdraw", withdraw);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const donateFunds = async () => {
    try {
      const donateFund = ethers.utils.parseEther("1");
      const contract = await connectingToLookUpContract();
      const donate = await contract.donate({ value: donateFund.toString() });
      await donate.wait();
      console.log("donate", donate);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const transferNativeToken = async (token) => {
    try {
      const { address, tokenNo } = token;
      console.log(token);
      const transferamount = ethers.utils.parseEther(tokenNo);
      const contract = await connectingTokenContract();
      const transact = await contract.transfer(address, transferamount);
      await transact.wait();
      window.location.reload();
      console.log("transact", transact);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StateContext.Provider
      value={{
        transferNativeToken,
        donateFunds,
        withdrawfunds,
        createERC20,
        address,
        getAllERC20Listed,
        getUserERC20Listed,
        getAllDonation,
        fee,
        balance,
        mainBalance,
        nativeToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export default StateContextprovider;

export const contextProvider = () => useContext(StateContext);
