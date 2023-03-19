// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Registry {
    struct PayRequestSplit {
        address payer;
        uint256 amount;
        bool isPaid;
    }

    struct PayRequest {
        string description;
        PayRequestSplit[] splits;
    }

    mapping(bytes32 => PayRequest) public Requests;
    mapping(address => bytes32[]) public AddressRequests;

    function get(bytes32 id) public view returns (PayRequest memory) {
        return Requests[id];
    }

    function set(bytes32 id, PayRequest calldata request) public {
        require(
            Requests[id].splits.length == 0,
            "PayRequest with id already exists"
        );
        AddressRequests[msg.sender].push(id);
        Requests[id] = request;
    }

    function getRequestsIds(
        address owner
    ) public view returns (bytes32[] memory) {
        return AddressRequests[owner];
    }
}
