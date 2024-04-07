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

