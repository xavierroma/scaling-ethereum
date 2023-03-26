// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Splitz.sol";
import "../src/Registry.sol";

import "./Registry.t.sol";

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
import "./utils/Receipts.t.sol";
import "./utils/Permit.t.sol";

contract SplitzTest is Test, ReceiptsUtils, PermitUtils {
    Splitz public splitz;

    address constant USDC = 0xf06605C57289098Cb82b284c0D2Dcbc3ba84d2d0;
    IERC20 public constant ContractUSDC = IERC20(USDC);
    IERC20Permit public constant ContractUSDCPermit = IERC20Permit(USDC);

    function setUp() public {
        splitz = new Splitz(USDC);
    }

    function testFail_pay_notInReceipt() public {
        uint256 amount = 100_000_000;
        (address source, uint256 sourcePkey) = makeAddrAndKey("source");
        address receiver = makeAddr("receiver");

        Splitz.Permit memory permit = Splitz.Permit(
            source,
            address(splitz),
            amount,
            ContractUSDCPermit.nonces(source),
            type(uint256).max
        );

        Splitz.Signature memory signature = computePermitSignature(
            permit,
            USDC,
            sourcePkey
        );

        address[2] memory owing = [
            0xBBd039E7b0592d8918820024e2A7437b91235206,
            0xAbc5206BbD039e7B0592d8918820024E2A7437B9
        ];
        Registry.CreateReceiptLine[] memory lines = buildCreateReceiptLines(
            owing,
            10
        );
        vm.prank(receiver);
        uint56 receiptId = splitz.addReceipt("description", lines);

        vm.prank(source);
        splitz.pay(receiptId, permit, signature);
    }

    function test_pay() public {
        uint256 amount = 100_000_000;
        (address source, uint256 sourcePkey) = makeAddrAndKey("source");
        address receiver = makeAddr("receiver");

        deal(USDC, source, amount);

        assertEq(ContractUSDC.balanceOf(source), amount);
        assertEq(ContractUSDC.allowance(source, address(splitz)), 0);

        Splitz.Permit memory permit = Splitz.Permit(
            source,
            address(splitz),
            amount,
            ContractUSDCPermit.nonces(source),
            type(uint256).max
        );

        Splitz.Signature memory signature = computePermitSignature(
            permit,
            USDC,
            sourcePkey
        );

        address[2] memory owing = [
            source,
            0xAbc5206BbD039e7B0592d8918820024E2A7437B9
        ];
        Registry.CreateReceiptLine[] memory lines = buildCreateReceiptLines(
            owing,
            amount * 2
        );

        vm.prank(receiver);
        uint56 receiptId = splitz.addReceipt("description", lines);

        vm.prank(source);
        splitz.pay(receiptId, permit, signature);

        assertEq(ContractUSDC.balanceOf(receiver), amount);
        assertEq(ContractUSDC.allowance(source, address(splitz)), 0);

        Registry.Receipt memory receipt = splitz.getReceipt(receiptId);
        assertEq(receipt.lines[0].paid, true);
    }
}
