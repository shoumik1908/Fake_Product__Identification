// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VeriScanAI {
    
    struct Product {
        string productId;
        string productName;
        string manufacturer;
        uint256 manufactureDate;
        string imageHash;
        bool isAuthentic;
        uint256 verificationCount;
        bool exists;
    }
    
    struct VerificationRecord {
        uint256 timestamp;
        address verifier;
        bool aiResult;
        uint256 confidenceScore;
        string imageHash;
    }
    
    mapping(string => Product) public products;
    mapping(string => VerificationRecord[]) public verificationHistory;
    
    address public owner;
    
    event ProductRegistered(string productId, string productName, uint256 timestamp);
    event ProductVerified(string productId, bool isAuthentic, uint256 confidenceScore);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerProduct(
        string memory _productId,
        string memory _productName,
        string memory _manufacturer,
        string memory _imageHash
    ) public onlyOwner {
        require(!products[_productId].exists, "Product already exists");
        
        products[_productId] = Product({
            productId: _productId,
            productName: _productName,
            manufacturer: _manufacturer,
            manufactureDate: block.timestamp,
            imageHash: _imageHash,
            isAuthentic: true,
            verificationCount: 0,
            exists: true
        });
        
        emit ProductRegistered(_productId, _productName, block.timestamp);
    }
    
    function verifyAuthenticity(
        string memory _productId,
        bool _aiResult,
        uint256 _confidenceScore,
        string memory _imageHash
    ) public {
        require(products[_productId].exists, "Product not found");
        
        VerificationRecord memory record = VerificationRecord({
            timestamp: block.timestamp,
            verifier: msg.sender,
            aiResult: _aiResult,
            confidenceScore: _confidenceScore,
            imageHash: _imageHash
        });
        
        verificationHistory[_productId].push(record);
        products[_productId].verificationCount++;
        
        emit ProductVerified(_productId, _aiResult, _confidenceScore);
    }
}
