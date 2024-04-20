import { ethers } from "ethers";
import Web3Modal from "web3modal";

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

const fetchContract = (Signerorprovider) =>
  new ethers.Contract(
    LookUpContract_ADDRESS,
    LookUpContract_ABI,
    Signerorprovider
  );

export const connectingToLookUpContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contrat = fetchContract(signer);
    return contrat;
  } catch (error) {
    console.log(error);
  }
};

export const getBalanace = async () => {
  try {
    const web3modal = new web3modal();
    const connection = await web3modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return await signer.getBalance();
  } catch (error) {
    console.log(error);
  }
};

//lets now deal with trhe tokencontract
const fetchTokenContract = (Signerorprovider) =>
  new ethers.Contract(
    ER20Generator_ADDRESS,
    ERC20Generator_ABI,
    Signerorprovider
  );
export const connectingTokenContract = async () => {
  try {
    const web3modal = new web3modal();
    const connection = await web3modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchTokenContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
