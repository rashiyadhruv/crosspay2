// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";

contract TransLend {
    using Counters for Counters.Counter;
    Counters.Counter private _listingIdCounter;

    receive() payable external {}

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized!");
        _;
    }

    struct CompanyDetails {
        uint256 id;
        address owner;
        string companyName;
        string description;
        uint256 loanAmt;
        uint256 currentInterestBid;
        string docs;
        bool bidingStatus;
    }
    CompanyDetails[] public companyDetails;

    struct Offer {
        string name;
        bool approved;
    }

    mapping(uint256 => CompanyDetails) public companyDetailsById;
    mapping(address => CompanyDetails[]) public companyDetailsByAddress;
    mapping(uint256 => Offer[]) public offerDetailsByCompanyId;

    function(string memory _companyName, string memory _description, uint256 _loanAmt, string memory _docs) public { // working, done
        uint256 _listingId = _listingIdCounter.current();

        CompanyDetails memory newCompany = CompanyDetails(_listingId, msg.sender, _companyName, _description, _loanAmt, 10000, _docs, true);

        companyDetails.push(newCompany);
        companyDetailsById[_listingId] = newCompany;
        companyDetailsByAddress[msg.sender].push(newCompany);

        _listingIdCounter.increment();
    }

    function withdraw() onlyAdmin payable public { // working
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    function requestDocuments(uint256 _listingId, string memory _institutionName) public { // working, done
        Offer memory newOffer = Offer(_institutionName, false);

        offerDetailsByCompanyId[_listingId].push(newOffer);
    }

    function approveOffer(uint256 _listingId, uint256 _index) public { 
        offerDetailsByCompanyId[_listingId][_index].approved = true;
        companyDetailsById[_listingId].bidingStatus = false;
    }

    function bid(uint256 _listingId, uint256 _bidValue) public { // working
        require(_bidValue < companyDetailsById[_listingId].currentInterestBid, "Offer something better"); 
        
        companyDetailsById[_listingId].currentInterestBid = _bidValue;
        
    } 

    function getMyListings(address _user) public view returns(CompanyDetails[] memory) { // working, done
        return companyDetailsByAddress[_user];
    }

    function getAllBidings() public view returns(CompanyDetails[] memory) { // working, done
        uint256 countCompany = 0;
        uint256 currentindex = 0;

        for (uint256 i = 0; i < companyDetails.length; i++) {
            if (companyDetailsById[i].bidingStatus == true) {
                countCompany++;
            }
        }

        CompanyDetails[] memory items = new CompanyDetails[](countCompany);

        for (uint i = 0; i < companyDetails.length; i++) {
            if (companyDetailsById[i].bidingStatus == true) {
                items[currentindex] = companyDetailsById[i];
                currentindex++;
            }
        }

        return items;
    }

    function getBiddingListingDetails(uint256 _listingId) public view returns(CompanyDetails memory) { // working
        return companyDetailsById[_listingId];
    }

    function getListingsOfferDetails(uint256 _listingId) public view returns(Offer[] memory) { // working, done
        return offerDetailsByCompanyId[_listingId];
    }

    function getCurrentId() public view returns(uint256) { // working
        return _listingIdCounter.current();
    }

    function balance() onlyAdmin public view returns(uint256) { // working
        return address(this).balance;
    }
}