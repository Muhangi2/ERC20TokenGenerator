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
  const [balance, setBalance] = useState("");
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
      const nativeToken = await connectingTokenContract();
      
    } catch (error) {}
  };
};
