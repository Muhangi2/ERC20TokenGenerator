import { ethers } from "ethers";
import web3modal from "web3modal";

import {
  ERC20Generator_ABI,
  ER20Generator_ADDRESS,
  ERC20Generator_BYTECODE,
  LookUpContract_ABI,
  LookUpContract_ADDRESS,
} from "../Context/constants";

export const checkIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) return console.log("install metamask Wallet");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const firstaccount = accounts[0];
    return firstaccount;
  } catch (error) {
    console.log(error);
  }
};
export const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("install metamask Wallet");
  
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const firstaccount = accounts[0];
      return firstaccount;
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchContract=(Signerorprovider)=>new ethers.Contract(LookUpContract_ADDRESS,LookUpContract_ABI,Signerorprovider)

  
