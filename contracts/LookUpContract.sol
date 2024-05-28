// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

contract LookUpContract {
    struct ERC20Token {
        uint256 tokenId;
        address owner;
        string tokenSupply;
        string tokenName;
        string tokenSymbol;
        string tokenAddress;
        string tokenTransactionHash;
        string tokenCreatedDate;
    }

    struct Donation {
        uint256 donationId;
        address donor;
        uint256 amount;
    }

    address payable public contractOwner = payable(0x1633B8595ed0847993801600C68e635FB32724D7);
    uint256 public listingPrice = 0.025 ether;

    // Mappings
    mapping(uint256 => ERC20Token) private erc20Tokens;
    mapping(uint256 => Donation) private donations;

    uint256 public _tokenIndex;
    uint256 public _donationIndex;

    event DonationReceived(address indexed donor, uint256 amount);
    event ERC20TokenListed(
        uint256 indexed tokenId,
        address indexed owner,
        string tokenAddress
    );

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only owner can call this function");
        _;
    }

    // Creating a new ERC20 token
    function createERC20Token(
        address _owner,
        string memory _tokenSupply,
        string memory _tokenName,
        string memory _tokenSymbol,
        string memory _tokenAddress,
        string memory _tokenTransactionHash,
        string memory _tokenCreatedDate
    )
        external
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
        uint256 _tokenId = _tokenIndex;
        ERC20Token storage erc20Token = erc20Tokens[_tokenId];

        erc20Token.owner = _owner;
        erc20Token.tokenId = _tokenId;
        erc20Token.tokenSupply = _tokenSupply;
        erc20Token.tokenSymbol = _tokenSymbol;
        erc20Token.tokenName = _tokenName;
        erc20Token.tokenAddress = _tokenAddress;
        erc20Token.tokenTransactionHash = _tokenTransactionHash;
        erc20Token.tokenCreatedDate = _tokenCreatedDate;

        emit ERC20TokenListed(_tokenId, _owner, _tokenAddress);

        return (
            _tokenId,
            _owner,
            _tokenSupply,
            _tokenName,
            _tokenSymbol,
            _tokenTransactionHash
        );
    }

    function getAllERC20TokenListed() public view returns (ERC20Token[] memory) {
        uint256 itemCount = _tokenIndex;
        ERC20Token[] memory items = new ERC20Token[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            ERC20Token storage currentItem = erc20Tokens[currentId];
            items[i] = currentItem;
        }
        return items;
    }

    // Fetching single ERC20 token
    function getSingleERC20Token(uint256 _tokenId)
        external
        view
        returns (
            uint256,
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        ERC20Token memory erc20Token = erc20Tokens[_tokenId];

        return (
            erc20Token.tokenId,
            erc20Token.owner,
            erc20Token.tokenSupply,
            erc20Token.tokenName,
            erc20Token.tokenSymbol,
            erc20Token.tokenAddress,
            erc20Token.tokenTransactionHash,
            erc20Token.tokenCreatedDate
        );
    }

    // Get user tokens
    function getUserTokens(address _owner) external view returns (ERC20Token[] memory) {
        uint256 totalItemCount = _tokenIndex;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (erc20Tokens[i].owner == _owner) {
                itemCount += 1;
            }
        }

        ERC20Token[] memory items = new ERC20Token[](itemCount);

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (erc20Tokens[i].owner == _owner) {
                ERC20Token storage currentItem = erc20Tokens[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Get listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Updating listing price
    function updatingListPrice(uint256 _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    // Withdraw funds
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Contract has no balance");
        payable(contractOwner).transfer(balance);
    }

    // Get contract balance
    function getContractBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    // Donation functionality
    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        _donationIndex++;
        uint256 _donationId = _donationIndex;
        Donation storage donation = donations[_donationId];
        donation.donationId = _donationId;
        donation.donor = msg.sender;
        donation.amount = msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getDonations() public view onlyOwner returns (Donation[] memory) {
        uint256 itemCount = _donationIndex;
        Donation[] memory items = new Donation[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            Donation storage currentItem = donations[currentId];
            items[i] = currentItem;
        }
        return items;
    }
}
