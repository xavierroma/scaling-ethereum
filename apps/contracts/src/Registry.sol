// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Registry {
    struct Receipt {
        uint56 id;
        address owed;
        uint256 timestamp;
        uint256 amount;
        ReceiptLine[] lines;
        string description;
    }
    struct ReceiptLine {
        address owes;
        uint256 amount;
        bool paid;
    }

    struct LedgerLine {
        uint56 id;
        bool paid;
        address owed;
        address owes;
        uint256 amount;
    }
    struct Metadata {
        uint56 id;
        uint256 timestamp;
        uint256 ledgerStartPosition;
        string description;
    }

    struct CreateReceiptLine {
        address owes;
        uint256 amount;
    }

    mapping(uint56 => Metadata) public metadata;

    LedgerLine[] public ledger;
    uint56 nextId = 0;

    function getReceipt(
        uint56 id
    ) public view returns (Receipt memory receipt) {
        require(id < nextId, "id is not valid");

        Metadata memory meta = metadata[id];
        uint count = 0;
        for (uint i = meta.ledgerStartPosition; i < ledger.length; i++) {
            if (ledger[i].id == id) {
                count++;
            }
        }
        receipt = Receipt({
            id: meta.id,
            owed: ledger[meta.ledgerStartPosition].owed,
            description: meta.description,
            timestamp: meta.timestamp,
            lines: new ReceiptLine[](count),
            amount: 0
        });
        for (uint i = meta.ledgerStartPosition; i < ledger.length; i++) {
            if (ledger[i].id != id) break;

            uint position = i - meta.ledgerStartPosition;
            receipt.lines[position] = ReceiptLine({
                owes: ledger[i].owes,
                amount: ledger[i].amount,
                paid: ledger[i].paid
            });
            receipt.amount += ledger[i].amount;
        }
    }

    function payReceipt(
        uint56 receiptId
    ) public returns (uint256 amountDue, address receiver) {
        Metadata memory meta = metadata[receiptId];

        amountDue = 0;
        receiver = ledger[meta.ledgerStartPosition].owed;

        for (uint i = meta.ledgerStartPosition; i < ledger.length; i++) {
            if (ledger[i].id != receiptId) break;
            if (ledger[i].owes != msg.sender || ledger[i].paid) {
                continue;
            }

            amountDue += ledger[i].amount;
            ledger[i].paid = true;
        }
    }

    function getReceiptsByAddress(
        address addr
    ) public view returns (Receipt[] memory receipts) {
        uint count = 0;
        for (uint i = 0; i < nextId; i++) {
            Receipt memory receipt = getReceipt(uint56(i));
            if (receipt.owed == addr) {
                count++;
                continue;
            }
            for (uint line = 0; line < receipt.lines.length; line++) {
                if (receipt.lines[line].owes == addr) {
                    count++;
                    break;
                }
            }
        }

        receipts = new Receipt[](count);
        uint position = 0;
        for (uint i = 0; i < nextId; i++) {
            Receipt memory receipt = getReceipt(uint56(i));
            if (receipt.owed == addr) {
                receipts[position++] = receipt;
                continue;
            }
            for (uint line = 0; line < receipt.lines.length; line++) {
                if (receipt.lines[line].owes == addr) {
                    receipts[position++] = receipt;
                    break;
                }
            }
        }
    }

    function addReceipt(
        string memory description,
        CreateReceiptLine[] calldata lines
    ) public returns (uint56) {
        require(lines.length > 0, "No lines provided");
        require(bytes(description).length > 0, "No description provided");

        uint256 startPosition = ledger.length;

        for (uint i = 0; i < lines.length; i++) {
            ledger.push(
                LedgerLine({
                    owes: lines[i].owes,
                    owed: msg.sender,
                    amount: lines[i].amount,
                    id: nextId,
                    paid: lines[i].owes == msg.sender
                })
            );
        }
        metadata[nextId] = Metadata({
            description: description,
            timestamp: block.timestamp,
            id: nextId,
            ledgerStartPosition: startPosition
        });
        return nextId++;
    }
}
