// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Registry.sol";

contract RegistryTest is Test {
    Registry public registry;

    function setUp() public {
        registry = new Registry();
    }

    function generatePayRequest() private pure returns(Registry.PayRequest memory) {
        Registry.PayRequestSplit[] memory splits = new Registry.PayRequestSplit[](2);
        splits[0]= Registry.PayRequestSplit({ 
                payer: 0x1235206bbD039E7B0592d8918820024E2A7437b9,
                amount: 5,
                isPaid: false
             });
        splits[1]= Registry.PayRequestSplit({ 
                payer: 0xAbc5206BbD039e7B0592d8918820024E2A7437B9,
                amount: 5,
                isPaid: false
             });
        return Registry.PayRequest({
            description: "request description",
            splits: splits
        });
    }

    function test_Set() public {
        vm.startPrank(msg.sender);
        bytes32[] memory ids = registry.getRequestsIds(msg.sender);
        assertEq(ids.length, 0);

        bytes32 id1 = "request-1";
        Registry.PayRequest memory req1 = generatePayRequest();
        
        registry.set(id1, req1);
        ids = registry.getRequestsIds(msg.sender);

        assertEq(registry.get(id1).splits.length, 2);
        assertEq(ids.length, 1);
        assertEq(ids[0], id1);


        bytes32 id2 = "request-2";
        Registry.PayRequest memory req2 = generatePayRequest();

        registry.set(id2, req2);
        ids = registry.getRequestsIds(msg.sender);

        assertEq(registry.get(id2).splits.length, 2);
        assertEq(ids.length, 2);
        assertEq(ids[1], id2);
    }

    function test_FailIf_IdExists() public {
        bytes32 id = "test1";
        Registry.PayRequest memory req = generatePayRequest();
        registry.set(id, req);
        vm.expectRevert("PayRequest with id already exists");
        registry.set(id, req);
    }
}
