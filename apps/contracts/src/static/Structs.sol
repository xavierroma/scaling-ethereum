// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

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
