//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./Interfaces/IWETH.sol";
import "./OpenZeppelin/token/ERC721/ERC721.sol";
import "./OpenZeppelin/upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./OpenZeppelin/upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";

contract TokenVault is ERC20Upgradeable, ERC721HolderUpgradeable {
    using Address for address;

    /// -----------------------------------
    /// -------- BASIC INFORMATION --------
    /// -----------------------------------

    /// @notice weth address
    address public constant weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    /// -----------------------------------
    /// -------- TOKEN INFORMATION --------
    /// -----------------------------------

    /// @notice the ERC721 token address of the vault's token
    address public token;

    /// @notice the ERC721 token ID of the vault's token
    uint256 public id;

    /// @notice the address who initially deposited the NFT
    address public curator;

    constructor() {
    }

    function initialize(address _curator, address _token, uint256 _id, uint256 _supply, string memory _name, string memory _symbol) external initializer {
        // initialize inherited contracts
        __ERC20_init(_name, _symbol);
        __ERC721Holder_init();
        // set storage variables
        token = _token;
        id = _id;
        curator = _curator;
        _mint(_curator, _supply);
    }
}