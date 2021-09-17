// SPDX-License-Identifier: MIT
//pragma solidity >=0.4.22 <0.9.0;
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract GameContract {

  address owner3;
  address owner;
  address owner2;
  
//////// Constructor 
//compiler requires public
  constructor() public {
    owner= msg.sender;
    owner2= address(0x49A3e9f02E8b0a6076f8568361926D54d17730Cb);
  }
/////// Constructor END
  
  enum gameState { Created, InProgress, Ended, Staged, Open }
  
  struct gameSettings {
    uint16 startsAt;
    bool openInvite;
    uint16 totalTime;
    uint16 timeoutTime;
    uint wageSize; 
  }

  struct gameData {
    address playerOne;
    address playerTwo;
    gameState gState;
    bytes32 currentGameBoard;
    address lastMover;
    gameSettings settings;
    uint gameBalance; 
  }
  
  uint24 gameId;
  mapping (uint24 => gameData) games; 
  mapping (address => uint24) myLastGame;
  address[32] gameOwners;
  address[32] gamePlayers;

  event newGameCreatedEvent(address indexed _playerOne, uint24 indexed _gameId);

////// Modifiers Start 
  modifier isOwner() {
    require (msg.sender == owner|| msg.sender == owner2 || msg.sender == owner3, "Not an Owner");
    _; 
  }
   function setNewOwner(address _newOwner) isOwner external {
     owner3= _newOwner;
  }

////// Modifiers END


  function initializeGame(address _playerTwo,
                          uint16 _startsAt,
                          uint16 _totalTime,
                          uint16 _timeoutTime,
                          uint _wageSize ) public payable returns(bool) {
    

    require(_wageSize >= msg.value, "Somethin went wrong, or you're mistaken.");

    gameData memory initializedGame;
    bool openGame;

    if (_playerTwo == address(0)) { 
      openGame= true; 
      }

    initializedGame.settings = gameSettings ({ startsAt: _startsAt,
                                              openInvite: openGame,
                                              totalTime: _totalTime,
                                              timeoutTime: _timeoutTime,
                                              wageSize:  _wageSize });

    initializedGame.playerOne= msg.sender;
    initializedGame.playerTwo= _playerTwo;

    if (openGame) {
      initializedGame.gState = gameState.Created;
    } else {
      initializedGame.gState = gameState.Staged;
    }
    
    games[gameId]= initializedGame; 
    gameId++;

    emit newGameCreatedEvent(msg.sender,gameId);
    return true;
  }

  function getLastGameId() public view returns(uint24) {
    return gameId; 
  }

  function getOpenGames(uint24 gId) public view returns(gameData memory gameRetrieved) {
    if (games[gId].gState == gameState.Created) {
      gameRetrieved = games[gId];
    }
  }
 


  




}
