// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../../src/Splitz.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";

contract PermitUtils is Test {
    bytes32 public PERMIT_TYPEHASH =
        0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;

    function computePermitSignature(
        Splitz.Permit memory permit,
        address token,
        uint256 ownerPkey
    ) internal returns (Splitz.Signature memory signature) {
        bytes32 domainSeparator = IERC20Permit(token).DOMAIN_SEPARATOR();
        bytes32 digest = getTypedDataHashPermit(permit, domainSeparator);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPkey, digest);

        return Splitz.Signature(v, r, s);
    }

    function getStructHashPermit(
        Splitz.Permit memory permit
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    PERMIT_TYPEHASH,
                    permit.owner,
                    permit.spender,
                    permit.value,
                    permit.nonce,
                    permit.deadline
                )
            );
    }

    function getTypedDataHashPermit(
        Splitz.Permit memory permit,
        bytes32 domainSeparator
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    domainSeparator,
                    getStructHashPermit(permit)
                )
            );
    }
}
