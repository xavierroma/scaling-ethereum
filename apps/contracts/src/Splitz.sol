// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "./Registry.sol";

contract Splitz is Registry {
    IERC20 public token;
    IERC20Permit public tokenPermit;

    struct Signature {
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    struct Permit {
        address owner;
        address spender;
        uint256 value;
        uint256 nonce;
        uint256 deadline;
    }

    constructor(address _token) {
        token = IERC20(_token);
        tokenPermit = IERC20Permit(_token);
    }

    function payReceipt(
        uint56 receiptId,
        Permit calldata permit,
        Signature memory signature
    ) public {
        (uint256 amountDue, address receiver) = Registry.payReceipt(receiptId);

        require(amountDue > 0, "Splitz: no amount to pay");

        tokenPermit.permit(
            msg.sender,
            address(this),
            amountDue,
            permit.deadline,
            signature.v,
            signature.r,
            signature.s
        );
        token.transferFrom(msg.sender, receiver, amountDue);
    }
}
