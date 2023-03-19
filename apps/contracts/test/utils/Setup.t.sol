// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {PermitUtils} from "./PermitUtils.sol";

import {Signature, Permit} from "../../src/static/Structs.sol";

abstract contract Setup is Test {
    function computePermitSignature(
        Permit memory permit,
        address tokenAddress,
        uint256 _ownerPkey
    ) internal returns (Signature memory signature) {
        PermitUtils permitUtils = new PermitUtils(tokenAddress);

        bytes32 digest = permitUtils.getTypedDataHashPermit(permit);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(_ownerPkey, digest);

        return Signature(v, r, s);
    }
}
