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
        string tokenAddress;
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

    function getAllERC20TokenListed() public view returns (ER20Token[] memory) {
        uint256 itemCount = _tokenIndex;
        uint256 currentIndex = 0;
        ER20Token[] memory items = new ER20Token[](itemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            uint256 currentId = i + 1;
            ER20Token storage currentItem = erc20Tokens[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }
    //fetting single ERC20 token
    function getSingleERC20Token(
        uint256 _tokenId
    )
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
        ER20Token memory erc20Token = erc20Tokens[_tokenId];

        return (
            erc20Token.tokenId,
            erc20Token.owner,
            erc20Token.tokenSupply,
            erc20Token.tokenName,
            erc20Token.tokenSymbol,
            erc20Token.tokenAddress,
            erc20Token.TokenTransactionHash,
            erc20Token.tokenCreatedDate
        );
    }
    //get usertokens
    function getUserTokens(
        address _owner
    ) external view returns (ER20Token[] memory) {
        uint256 totalitemcount = _tokenIndex;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalitemcount; i++) {
            if (erc20Tokens[i].owner == _owner) {
                itemCount += 1;
            }
        }

        ER20Token[] memory items = new ER20Token[](itemCount);

        for (uint256 i = 0; i < totalitemcount; i++) {
            if (erc20Tokens[i + 1].owner == _owner) {
                uint256 currentId = i + 1;
                ER20Token storage currentItem = erc20Tokens[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
    ///get listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }
    //set updating  price
    function updatingListPrice(
        uint256 _listingPrice,
        address _owner
    ) public payable onlyOwner {
        require(contractOwner == _owner, "Only owner can call this function");
        listingPrice = _listingPrice;
    }
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Contract has no balance");
        payable(contractOwner).transfer(balance);
    }
    function getContractBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }
    //donation now
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
        uint256 currentIndex = 0;
        Donation[] memory items = new Donation[](itemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            uint256 currentId = i + 1;
            Donation storage currentItem = donations[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }
}
