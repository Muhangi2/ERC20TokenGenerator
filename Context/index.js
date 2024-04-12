import { useEffect, useState, useContext, createContext } from "react";
import web3modal from "web3modal";
import { ethers } from "ethers";
import {
  checkIfWalletIsConnected,
  connectWallet,
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
      //get user account
      const account = await checkIfWalletIsConnected();
      setAddress(account);
      //get user balance
      const balance = await getBalanace(account);
      setBalance(ethers.utils.formatEther(balance.toString()));
      //set nativetoken
      const nativeContract = await connectingTokenContract();
      if (account) {
        const nativeBalance = await nativeContract.balanceOf(account);
        const nativeName = await nativeContract.name();
        const nativeSymbol = await nativeContract.symbol();
        const nativeDecimals = await nativeContract.decimals();
        const nativeTotalSupply = await nativeContract.totalSupply();
        const nativeTokenAdress = nativeContract.address;
        const nativeTokenn = {
          balance: ethers.utils.formatEther(nativeBalance.toString(), "ethers"),
          name: nativeName,
          symbol: nativeSymbol,
          decimals: nativeDecimals,
          totalSupply: ethers.utils.formatEther(
            nativeTotalSupply.toString(),
            "ethers"
          ),
          address: nativeTokenAdress,
        };
        setNativeToken(nativeTokenn);
        console.log(nativeTokenn, "nativetokennn");
      }
      //get contract
      const loopUpcontract = await connectingToLookUpContract();
      //get contract balance
      if (account == "0x1633B8595ed0847993801600C68e635FB32724D7") {
        const mainBalance = await loopUpcontract.getContractBalance();
        const balanceinethers = ethers.utils.formatEther(
          mainBalance.toString()
        );
        console.log(balanceinethers);
        setMainBalance(balanceinethers);
      }
      //get all ERC20 token
      const getAllErcTokenList = await loopUpcontract.getAllERC20TokenListed();
      const parseToken = getAllErcTokenList.map((ERC20token, i) => ({
        tokenId: ERC20token.tokenId.toNumber(),
        tokenAddress: ERC20token.tokenAddress,
        tokenName: ERC20token.tokenName,
        tokenSymbol: ERC20token.tokenSymbol,
        tokenDecimals: ERC20token.tokenDecimals.toNumber(),
        tokenTotalSupply: ERC20token.tokenTotalSupply,
        tokenOwner: ERC20token.tokenOwner,
        tokenCreatedDate: ERC20token.tokenCreatedDate,
        TokenTransactionHash: ERC20token.TokenTransactionHash,
      }));
      setGetAllERC20Listed(parseToken);
      //get user ERC20 token
      if (account) {
        const getUserTokenList = await loopUpcontract.getUserTokens(account);
        const parseUserToken = getUserTokenList.map((ERC20token, i) => ({
          tokenId: ERC20token.tokenId.toNumber(),
          tokenAddress: ERC20token.tokenAddress,
          tokenName: ERC20token.tokenName,
          tokenSymbol: ERC20token.tokenSymbol,
          tokenDecimals: ERC20token.tokenDecimals.toNumber(),
          tokenTotalSupply: ERC20token.tokenTotalSupply,
          tokenOwner: ERC20token.tokenOwner,
          tokenCreatedDate: ERC20token.tokenCreatedDate,
          TokenTransactionHash: ERC20token.TokenTransactionHash,
        }));
        setGetUserERC20Listed(parseUserToken);
      }

      // all the listing price
      const listingprice = await loopUpcontract.getListingPrice();
      const price = ethers.utils.formatEther(listingprice.toString());
      setFee(price);
      //donations
      const allDonation = await loopUpcontract.getDonations();
      const parseDonation = allDonation.map((donation, i) => ({
        donationId: donation.donationId.toNumber(),
        donor: donation.donor,
        amount: donation.amount,
      }));
      setGetAllDonation(parseDonation);
    } catch (error) {
      console.log(error);
    }
  };
  //on every render
  useEffect(() => {
    fetchInitialData();
  }, []);
  //deploy contract
  const _deployContract = async (signer, account, name, symbol, supply) => {
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

      let contract = await factory.deploy(name, symbol, _initialSupply);
      const transaction = await contract.deployed();

      const today = Date.now();
      let date = new Date(today);
      const _tokenCreatedDate = date.toLocaleDateString("en-US");

      if (contract.address) {
        await createERC20Token(
          account,
          supply,
          name,
          symbol,
          contract.address, //from deployed address
          contract.deployTransaction.hash, //from deploty keyword
          _tokenCreatedDate
        ); // from deployed date
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createERC20Token = async (
    owner,
    supply,
    name,
    symbol,
    tokenAddress,
    TokenTransactionHash,
    tokenCreatedDate
  ) => {
    try {
      const loopUpcontract = await connectingToLookUpContract();
      const listingprice = await loopUpcontract.getListingPrice();
      const transaction = await loopUpcontract.createERC20Token(
        owner,
        supply,
        name,
        symbol,
        tokenAddress,
        TokenTransactionHash,
        tokenCreatedDate,
        {
          value: listingprice.toString(),
        }
      );
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
        const web3modal = new web3modal();
        const connection = await web3modal.connectWallet();
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
      console, log(error);
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
