// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GameContract {

  address owner3;
  address owner;
  address owner2;

  constructor() public {
    owner= msg.sender;
    owner2= address(0x49A3e9f02E8b0a6076f8568361926D54d17730Cb);
  }

  enum gameState { Created, InProgress, Ended, Staged, Open }
  
  struct gameSettings {
    uint startsAt;
    bool openInvite;
    uint totalTime;
    uint timeoutTime;
    uint wageSize; 
  }

  struct gameData {
    address playerOne;
    address playerTwo;
    gameState gState;
    bytes32 currentGameBoard;
    address lastMover;
    gameSettings settings;
  }
  uint24 gameId;
  mapping (uint24 => gameData) games; 
  mapping (address => uint24) myLastGame;
  address[32] gameOwners;
  address[32] gamePlayers;

  event newGameCreatedEvent(address indexed _playerOne, address indexed _gameId);
  function initializeGame(address _playerTwo,
                          uint _startsAt,
                          bool _openInvite,
                          uint _totalTime,
                          uint _timeoutTime,
                          uint _wageSize ) public payable returns(bool) {
    

    require(_wageSize >= msg.value, "Somethin went wrong, or you.");
    return true;

  }


 


  modifier isOwner() {
    require (msg.sender == owner|| msg.sender == owner2 || msg.sender == owner3, "Not an Owner");
    _; 
  }

   function setNewOwner(address _newOwner) isOwner external {
     owner3= _newOwner;
  }




}
