// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/*

- Add receipt ( I am owed ) ( adds lines with msg.sender as to)
- Add repay ( adds lines with msg.sender as from )
- Get receipt
- Get all receipts
- Get all repay
- Whitelist address to address ( when paying )

*/

contract Registry {
    struct CreateReceiptLine {
        address owes;
        uint256 amount;
    }
    struct Receipt {
        uint256 id;
        ReceiptLine[] lines;
        string description;
        uint timestamp;
    }
    struct ReceiptLine {
        address owed;
        address owes;
        uint256 amount;
        uint56 id;
        uint8 operation;
    }
    struct Metadata {
        string description;
        uint timestamp;
        uint56 id;
        uint ledgerStartPosition;
    }
    mapping(uint56 => Metadata) public metadata;
    ReceiptLine[] public ledger;
    uint56 nextId = 0;

    function getReceipt(uint56 id) public view returns (Receipt memory) {
        Metadata memory meta = metadata[id];
        uint count = 0;
        for (uint i = meta.ledgerStartPosition; i < ledger.length; i++) {
            if (ledger[i].id == id) {
                count++;
            }
        }
        Receipt memory receipt = Receipt({
            id: meta.id,
            description: meta.description,
            timestamp: meta.timestamp,
            lines: new ReceiptLine[](count)
        });
        for (uint i = meta.ledgerStartPosition; i < ledger.length; i++) {
            if (ledger[i].id == id) {
                receipt.lines[i - meta.ledgerStartPosition] = ledger[i];
            }
        }
        return receipt;
    }

    function getReceiptsByAddress(
        address addr
    ) public view returns (Receipt[] memory) {
        uint lastId = 0;
        uint count = 0;
        for (uint i = 0; i <= nextId; i++) {
            Receipt memory receipt = getReceipt(uint56(i));
            for (uint j = 0; j < receipt.lines.length; j++) {
                if (
                    (receipt.lines[j].owed == addr ||
                        receipt.lines[j].owes == addr) && receipt.id != lastId
                ) {
                    count++;
                    break;
                }
            }
        }

        Receipt[] memory receipts = new Receipt[](lastId);
        for (uint i = 0; i <= nextId; i++) {
            Receipt memory receipt = getReceipt(uint56(i));
            for (uint j = 0; j < receipt.lines.length; j++) {
                if (
                    receipt.lines[j].owed == addr ||
                    receipt.lines[j].owes == addr
                ) {
                    receipts[count] = receipt;
                }
            }
        }
        Receipt[] memory filteredReceipts = new Receipt[](count);
        for (uint i = 0; i < count; i++) {
            filteredReceipts[i] = receipts[i];
        }
        return filteredReceipts;
    }

    function addReceipt(
        string memory description,
        CreateReceiptLine[] calldata lines
    ) public returns (uint56) {
        uint256 startPosition = ledger.length;

        for (uint i = 0; i < lines.length; i++) {
            ledger.push(
                ReceiptLine({
                    owed: lines[i].owes,
                    owes: msg.sender,
                    amount: lines[i].amount,
                    id: nextId,
                    operation: 0
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
