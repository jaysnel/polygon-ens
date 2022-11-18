// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.0 <=0.8.20;

import "hardhat/console.sol";

contract Domains {
    constructor() {
        console.log('Creating Domains Contract');
    }

    mapping(string => address) public domains;
    mapping(string => string) public records;

    function register(string calldata name) public {
        // Check that the name is unregistered
        require(domains[name] == address(0));

        domains[name] = msg.sender;
        console.log('%s has registered a domain!', msg.sender);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        // Check that the owner is the transaction sender
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    function getRecord(string calldata name) public view returns (string memory) {
        return records[name];
    }
}