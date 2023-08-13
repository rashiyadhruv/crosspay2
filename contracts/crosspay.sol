// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";

contract CrossPay {
    address public admin;

    using Counters for Counters.Counter;
    Counters.Counter private _transactionIdCounter;

    receive() external payable {}

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized!");
        _;
    }

    struct Transaction {
        uint256 transactionId;
        address sender;
        address receiver;
        uint256 amount;
        string chain;
        string status; // "Waiting for acceptance", "Waiting for approval", "Completed", "Cancelled"
        uint256 startTime;
        uint256 endTime;
    }
    Transaction[] public transactions;

    mapping(uint256 => Transaction) public transactionById;
    mapping(address => Transaction[]) public senderTransactions;
    mapping(address => Transaction[]) public receiverTransactions;

    function balance() public view onlyAdmin returns (uint256) {
        // working
        return address(this).balance;
    }

    function withdraw() public payable onlyAdmin {
        // working
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    function executePayment(
        address _receiver,
        uint256 _amount,
        string memory _chain
    ) public payable {
        uint256 _transactionId = _transactionIdCounter.current();

        Transaction memory newTransaction = Transaction(
            _transactionId,
            msg.sender,
            _receiver,
            _amount,
            _chain,
            "Waiting for acceptance",
            block.timestamp,
            block.timestamp + 5 minutes
        );

        transactions.push(newTransaction);
        transactionById[_transactionId] = newTransaction;
        senderTransactions[msg.sender].push(newTransaction);
        receiverTransactions[_receiver].push(newTransaction);

        _transactionIdCounter.increment();
    }

    function cancelPayment(uint256 _transactionId) public payable {
        require(
            transactionById[_transactionId].sender == msg.sender,
            "You are not the sender!"
        );

        transactionById[_transactionId].status = "Cancelled";

        (bool sent, ) = msg.sender.call{
            value: transactionById[_transactionId].amount
        }("");
        require(sent, "Failed to send Ether");
    }

    function acceptIncomingPayment(uint256 _transactionId) public payable {
        require(
            transactionById[_transactionId].receiver == msg.sender,
            "You are not the receiver!"
        );
        require(
            transactionById[_transactionId].endTime < block.timestamp,
            "You are out of time"
        );

        transactionById[_transactionId].status = "Waiting for approval";
    }

    function approveOutgoingPayment(uint256 _transactionId) public payable {
        require(
            transactionById[_transactionId].sender == msg.sender,
            "You are not the sender!"
        );

        transactionById[_transactionId].status = "Completed";
    }

    function claimPayment(uint256 _transactionId) public payable {
        require(
            transactionById[_transactionId].sender == msg.sender,
            "You are not the receiver!"
        );

            interface ILiquidityLayerRouter {
            function dispatchWithTokens(
                uint32 _destinationDomain,
                bytes32 _recipientAddress,
                address _token,
                uint256 _amount,
                string calldata _bridge,
                bytes calldata _messageBody
            ) external returns (bytes32);
        }
            interface ILiquidityLayerMessageRecipient {
            function handleWithTokens(
                uint32 _origin,
                bytes32 _sender,
                bytes calldata _message,
                address _token,
                uint256 _amount
            ) external;
}
    }

    function getEndedPayments() public view returns (Transaction[] memory) {
        uint256 countTransactions = 0;
        uint256 currentindex = 0;

        for (uint256 i = 0; i < transactions.length; i++) {
            if (
                keccak256(abi.encodePacked(transactionById[i].status)) ==
                keccak256(abi.encodePacked("Completed")) ||
                keccak256(abi.encodePacked(transactionById[i].status)) ==
                keccak256(abi.encodePacked("Cancelled"))
            ) {
                countTransactions++;
            }
        }

        Transaction[] memory items = new Transaction[](countTransactions);

        for (uint i = 0; i < transactions.length; i++) {
            if (
                keccak256(abi.encodePacked(transactionById[i].status)) ==
                keccak256(abi.encodePacked("Completed")) ||
                keccak256(abi.encodePacked(transactionById[i].status)) ==
                keccak256(abi.encodePacked("Cancelled"))
            ) {
                items[currentindex] = transactionById[i];
                currentindex++;
            }
        }

        return items;
    }

    function getSendingPayments(
        address _sender
    ) public view returns (Transaction[] memory) {
        Transaction[] memory items = new Transaction[](
            senderTransactions[_sender].length
        );

        for (uint256 i = 0; i < senderTransactions[_sender].length; i++) {
            items[i] = transactionById[
                senderTransactions[_sender][i].transactionId
            ]; // wrong
        }

        return items;
    }

    function getReceivingPayments(
        address _receiver
    ) public view returns (Transaction[] memory) {
        Transaction[] memory items = new Transaction[](
            receiverTransactions[_receiver].length
        );

        for (uint256 i = 0; i < receiverTransactions[_receiver].length; i++) {
            items[i] = transactionById[
                receiverTransactions[_receiver][i].transactionId
            ]; // wrong
        }

        return items;
    }

    /*
        1. Sender --> $ --> CrossPay Timer Starts - 5mins
        2. Recepient --> Get Withdraw Request
        3. Recepient Accepts Request and Requests Approval
        4. Sender approves the address
        5. Recepient receives amount
    */
}
