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
    }

    struct LedgerLine {
        uint56 id;
        uint8 operation;
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
                amount: ledger[i].amount
            });
            receipt.amount += ledger[i].amount;
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