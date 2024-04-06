// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Generator is ERC20 {
    constructor(uint256 _initialSupply) ERC20("ERC20Generator", "ERC20") {
        _mint(msg.sender, _initialSupply);
    }
}
