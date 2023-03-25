// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Registry.sol";
import "./utils/Receipts.t.sol";

contract RegistryTest is Test, ReceiptsUtils {
    Registry public registry;

    function setUp() public {
        registry = new Registry();
    }

    function test_addReceipt() public {
        address owed = 0x1235206bbD039E7B0592d8918820024E2A7437b9;
        address[2] memory owing = [
            0xBBd039E7b0592d8918820024e2A7437b91235206,
            0xAbc5206BbD039e7B0592d8918820024E2A7437B9
        ];
        Registry.CreateReceiptLine[] memory lines = buildCreateReceiptLines(
            owing,
            10
        );

        vm.prank(owed);
        uint56 receiptId = registry.addReceipt("description", lines);

        Registry.Receipt memory receipt = registry.getReceipt(receiptId);

        assertEq(receipt.id, receiptId);
        assertEq(receipt.owed, 0x1235206bbD039E7B0592d8918820024E2A7437b9);
        assertEq(receipt.lines.length, lines.length);
        assertEq(
            receipt.lines[0].owes,
            0xBBd039E7b0592d8918820024e2A7437b91235206
        );
        assertEq(receipt.lines[0].amount, 5);
        assertEq(
            receipt.lines[1].owes,
            0xAbc5206BbD039e7B0592d8918820024E2A7437B9
        );
        assertEq(receipt.lines[1].amount, 5);
        assertEq(receipt.description, "description");
        assertEq(receipt.amount, lines[0].amount + lines[1].amount);
    }

    function test_getReceipt() public {
        Registry.CreateReceiptLine[] memory lines = buildCreateReceiptLines(
            [
                0xBBd039E7b0592d8918820024e2A7437b91235206,
                0xAbc5206BbD039e7B0592d8918820024E2A7437B9
            ],
            10
        );

        vm.prank(0x1235206bbD039E7B0592d8918820024E2A7437b9);
        registry.addReceipt("description 1", lines);
        registry.addReceipt("description 2", lines);
        registry.addReceipt("description 3", lines);

        Registry.Receipt memory receipt = registry.getReceipt(0);
        assertEq(receipt.id, 0);
    }

    function testFail_getReceipt_InvalidId() public {
        Registry.Receipt memory receipt = registry.getReceipt(1000);
    }

    function test_getReceiptsByAddress() public {
        Registry.CreateReceiptLine[]
            memory firstLines = buildCreateReceiptLines(
                [
                    0xBBd039E7b0592d8918820024e2A7437b91235206,
                    0xAbc5206BbD039e7B0592d8918820024E2A7437B9
                ],
                10
            );

        vm.prank(0x1235206bbD039E7B0592d8918820024E2A7437b9);
        registry.addReceipt("description 1", firstLines);

        Registry.CreateReceiptLine[]
            memory secondLines = buildCreateReceiptLines(
                [
                    0xAbc5206BbD039e7B0592d8918820024E2A7437B9,
                    0x1112206bbD039e7B0592D8918820024E2A7437b9
                ],
                10
            );
        vm.prank(0xBBd039E7b0592d8918820024e2A7437b91235206);
        registry.addReceipt("description 2", secondLines);

        Registry.CreateReceiptLine[]
            memory thirdLines = buildCreateReceiptLines(
                [
                    0x8885206Bbd039E7b0592d8918820024e2A7437B9,
                    0x9995206bBd039e7b0592d8918820024E2a7437b9
                ],
                10
            );
        vm.prank(0xAbc5206BbD039e7B0592d8918820024E2A7437B9);
        registry.addReceipt("description 3", thirdLines);

        Registry.Receipt[] memory AbcReceipts = registry.getReceiptsByAddress(
            0xAbc5206BbD039e7B0592d8918820024E2A7437B9
        );
        assertEq(AbcReceipts.length, 3);

        Registry.Receipt[] memory oneTwoReceipts = registry
            .getReceiptsByAddress(0x1235206bbD039E7B0592d8918820024E2A7437b9);
        assertEq(oneTwoReceipts.length, 1);
        assertEq(oneTwoReceipts[0].id, 0);

        Registry.Receipt[] memory bbReceipts = registry.getReceiptsByAddress(
            0xBBd039E7b0592d8918820024e2A7437b91235206
        );
        assertEq(bbReceipts.length, 2);
        assertEq(bbReceipts[0].id, 0);
        assertEq(bbReceipts[1].id, 1);
    }
}
