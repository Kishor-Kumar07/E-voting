// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  // Defining a structure with boolean  
      // variables authoried and voted
      struct Voter{
          bool voted;
      }
  
      // Declaring the unsigned integer 
      // variables totalVotes, and for the 
      //3 teams
      uint  totalVotes;
      uint teamA; 
      uint  teamB; 
      uint teamC;
      //mapping[] memory Vote = new mapping[](3);
      // Creating a mapping for the total Votes
      mapping(uint=>uint) President;
      mapping(uint=>uint) VicePresident; 
      mapping(uint=>uint) GenSec;
      mapping(address=>Voter) info;

      // Defining a function to check and 
      // skip the code if the person is already 
      // voted else allow to vote and 
      // calculate totalvotes for team A   
      function castVote(address _address , uint pres , uint vicepres , uint gensec ) public { 
        require(
        !info[_address].voted, 
        "already voted person");
        info[_address].voted = true;
        President[pres]++;
        VicePresident[vicepres]++;
        GenSec[gensec]++;
        totalVotes++;
      }
  
  
      function totalVotesF() public view returns(uint){
          return totalVotes;
      }
}
