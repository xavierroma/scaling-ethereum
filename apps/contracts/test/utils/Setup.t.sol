// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {PermitSigUtils} from "./PermitSigUtils.sol";

import {Signature, Permit} from "../../src/static/Structs.sol";

abstract contract Setup is Test {
    PermitSigUtils internal permitSigUtils = new PermitSigUtils();

    function computePermitSignature(
        Permit memory permit,
        address tokenAddress,
        uint256 _ownerPkey
    ) internal returns (Signature memory signature) {
        bytes32 domainSeparator = permitSigUtils.getDomainSeparator(
            tokenAddress
        );

        bytes32 digest = permitSigUtils.getTypedDataHashPermit(
            permit,
            domainSeparator
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(_ownerPkey, digest);

        return Signature(v, r, s);
    }
}
