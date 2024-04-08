import { useEffect, useState, useContext, createContext } from "react";
import { ethers } from "ethers";
import {
  checkIfWalletIsConnected,
  connectWallet,
  connectingToLookUpContract,
  connectingTokenContract,
  getBalanace,
} from "../Utils";

import { ERC20Generator_ABI, ERC20Generator_BYTECODE } from "./constants";

const Context = createContext();

export const Contextprovider = ({ children }) => {
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

    const today=Date.now();
    let date=new Date(today);
    const _tokenCreatedDate = date.toLocaleDateString('en-US');

    if(contract.address){
      await createERC20Token()
    }

  } catch (error) {
    console.log(error);
  }
};
