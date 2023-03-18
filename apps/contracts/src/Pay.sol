// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {Permit, Signature} from "./static/Structs.sol";

contract Pay {
    IERC20 public USDC;
    IERC20Permit public USDCPermit;

    constructor(address _token) {
        USDC = IERC20(_token);
        USDCPermit = IERC20Permit(_token);
    }

    function pay(Permit calldata permit, Signature memory signature) public {
        uint256 amount = 100_000_000;
        address receiver = 0x2DB6BDB71209AAb73942C0F924DDEE0202e36310;

        USDCPermit.permit(
            msg.sender,
            address(this),
            amount,
            permit.deadline,
            signature.v,
            signature.r,
            signature.s
        );
        USDC.transferFrom(msg.sender, receiver, amount);
    }
}
