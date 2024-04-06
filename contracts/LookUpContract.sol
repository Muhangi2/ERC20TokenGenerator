// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

contract LookUpContract {
    struct ER20Token {
        uint256 tokenId;
        address owner;
        string tokenSupply;
        string tokenName;
        string tokenSymbol;
        address tokenAddress;
        string TokenTransactionHash;
        string tokenCreatedDate;
    }
    struct Donation {
        uint256 donationId;
        address donor;
        uint256 amount;
        // uint256 tokenId;
        // string donationDate;
    }
    address payable contractOwner =
        payable(0x1633B8595ed0847993801600C68e635FB32724D7);
    uint256 public listingPrice = 0.025 ether;
    //mapping
    mapping(uint256 => ER20Token) private erc20Tokens;
    mapping(uint256 => Donation) private donations;

    uint256 public _tokenIndex;
    uint256 public _donationIndex;

    event DonationReceived(address indexed donor, uint256 amount);
    event ERC20TokenListed(
        uint256 indexed,
        address indexed owner,
        string indexed token
    );

    modifier onlyOwner() {
        require(
            msg.sender == contractOwner,
            "Only owner can call this function"
        );
        _;
    }
    //creating a new ERC20 token
    function createERC20Token(
        uint256 _tokenId,
        address _owner,
        string memory _tokenSupply,
        string memory _tokenName,
        string memory _tokenSymbol,
        address _tokenAddress,
        string memory _tokenTransactionHash,
        string memory _tokenCreatedDate
    )
        external
        payable
        returns (
            uint256,
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        _tokenIndex++;
        uint256 _tokenid = _tokenIndex;
        ER20Token storage erc20Token = erc20Tokens[_tokenid];
        erc20Token.owner = _owner;
        erc20Token.tokenId = _tokenId;
        erc20Token.tokenSupply = _tokenSupply;
        erc20Token.tokenSymbol = _tokenSymbol;
        erc20Token.tokenName = _tokenName;
        erc20Token.tokenAddress = _tokenAddress;
        erc20Token.TokenTransactionHash = _tokenTransactionHash;
        erc20Token.tokenCreatedDate = _tokenCreatedDate;
        emit ERC20TokenListed(_tokenId, _owner, _tokenName);

        return (
            _tokenId,
            _owner,
            _tokenSupply,
            _tokenName,
            _tokenSymbol,
            _tokenTransactionHash
        );
    }
    


}
