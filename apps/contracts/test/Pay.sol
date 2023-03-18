// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Pay.sol";

import {Permit, Signature} from "../src/static/Structs.sol";

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
import {Setup} from "./utils/Setup.t.sol";

contract PayTest is Test, Setup {
    Pay public pay;
    address constant USDC = 0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83;
    IERC20 public constant ContractUSDC = IERC20(USDC);
    IERC20Permit public constant ContractUSDCPermit = IERC20Permit(USDC);

    function setUp() public {
        pay = new Pay(USDC);
    }

    function testPay() public {
        uint256 amount = 100_000_000;
        (address source, uint256 sourcePkey) = makeAddrAndKey("source");
        address receiver = 0x2DB6BDB71209AAb73942C0F924DDEE0202e36310;

        deal(address(USDC), source, amount);

        vm.startPrank(source);

        Permit memory permit = Permit(
            source,
            address(pay),
            amount,
            ContractUSDCPermit.nonces(source),
            type(uint256).max
        );

        Signature memory signature = computePermitSignature(
            permit,
            USDC,
            sourcePkey
        );

        pay.pay(permit, signature);

        assertEq(ContractUSDC.balanceOf(receiver), amount);
        assertEq(ContractUSDC.allowance(source, address(pay)), 0);
    }
}
