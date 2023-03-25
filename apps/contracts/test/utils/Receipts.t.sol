// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

import "../../src/Splitz.sol";
import "../../src/Registry.sol";

contract ReceiptsUtils {
    function buildCreateReceiptLines(
        address[2] memory owes,
        uint256 amount
    ) public pure returns (Registry.CreateReceiptLine[] memory lines) {
        lines = new Registry.CreateReceiptLine[](owes.length);
        for (uint i = 0; i < owes.length; i++) {
            lines[i] = Registry.CreateReceiptLine({
                owes: owes[i],
                amount: amount / owes.length
            });
        }
    }
}
