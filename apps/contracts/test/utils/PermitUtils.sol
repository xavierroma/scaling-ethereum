// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

import {Permit} from "../../src/static/Structs.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";

contract PermitUtils {
    bytes32 public PERMIT_TYPEHASH;
    bytes32 public DOMAIN_SEPARATOR;

    constructor(address token) {
        PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
        DOMAIN_SEPARATOR = IERC20Permit(token).DOMAIN_SEPARATOR();
    }

    /* ==================== REGULAR PERMIT ==================== */

    function getStructHashPermit(
        Permit memory permit
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
        Permit memory permit
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    DOMAIN_SEPARATOR,
                    getStructHashPermit(permit)
                )
            );
    }
}
