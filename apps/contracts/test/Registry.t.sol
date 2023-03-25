// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Registry.sol";

contract RegistryTest is Test {
    Registry public registry;

    function setUp() public {
        registry = new Registry();
    }

    function generatePayRequest()
        private
        pure
        returns (description string memory, splits Registry.PayRequestSplit[])
    {
        Registry.PayRequestSplit[]
            memory splits = new Registry.PayRequestSplit[](2);
        splits[0] = Registry.PayRequestSplit({
            payer: 0x1235206bbD039E7B0592d8918820024E2A7437b9,
            amount: 5,
            isPaid: false
        });
        splits[1] = Registry.PayRequestSplit({
            payer: 0xAbc5206BbD039e7B0592d8918820024E2A7437B9,
            amount: 5,
            isPaid: false
        });
        return
            Registry.PayRequest({
                description: "request description",
                splits: splits
            });
    }

    function test_addReceipt() public {
        (string memory description, Registry.CreateReceiptLine[] calldata splits) = generatePayRequest();
        vm.prank(msg.sender);
        uint256 receiptId = registry.addReceipt(description, splits);
        Registry.Receipt memory receipt = registry.getReceipt(receiptId);
        assertEq(receipt.requestId, requestId);
        assertEq(receipt.payer, request.splits[0].payer);
        assertEq(receipt.amount, 5);
        assertEq(receipt.isPaid, false);
    }
}
