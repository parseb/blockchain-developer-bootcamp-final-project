// SPDX-License-Identifier: MIT
//pragma solidity >=0.4.22 <0.9.0;
pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;

contract GameContract {

  address owner3;
  address owner;
  address owner2;
  uint24 gameId;
  
//////// Constructor 
//compiler requires public
  constructor() {
    owner= msg.sender;
    owner2= address(0x49A3e9f02E8b0a6076f8568361926D54d17730Cb);
    gameId=1;
  }

   function setNewOwner(address _newOwner) isOwner external {
     owner3= _newOwner;
  }
/////// Constructor END
  
  //enum gameState {NoAssignedState, Created, InProgress, Ended, Staged, Open }
  enum gameState {NoAssignedState, Staged, InProgress, Ended, Rejected }
  
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
  
  
  mapping (uint24 => gameData) public games; 
  mapping (address => uint24) myLastGame;
  address[32] gameOwners;
  address[32] gamePlayers;

  event newGameCreatedEvent(address indexed _playerOne, uint24 indexed _gameId);

////// Modifiers Start 
  modifier isOwner() {
    require (msg.sender == owner|| msg.sender == owner2 || msg.sender == owner3, "Not an Owner");
    _; 
  }

  function noOtherGameOnCreate(address player1) internal view returns(bool) {
    gameData memory lastPlayer1Game = games[myLastGame[player1]]; 
    //gameData memory lastPlayer2Game = games[myLastGame[player2]];

    if( (lastPlayer1Game.gState == gameState.Ended) || (lastPlayer1Game.gState == gameState.NoAssignedState) ){
      return true;
    } else {
      return false;
    }
    //require( (lastPlayer2Game.gState == gameState.Ended) || (lastPlayer2Game.gState == gameState.NoAssignedState), "Player 2 has game in progress." ); 
  }
  

////// Modifiers END


  function initializeGame(address _playerTwo,
                          uint16 _startsAt,
                          uint16 _totalTime,
                          uint16 _timeoutTime,
                          uint _wageSize ) public payable returns(uint24 justCreatedGameId) {
    

    //require(_wageSize >= msg.value, "Somethin went wrong, or you're mistaken.");

    //gameData storage initializedGame;
    bool openGame;
  

    games[gameId]= gameData({
                            playerOne: msg.sender,
                            playerTwo: _playerTwo,
                            gState: gameState.Staged,
                            currentGameBoard:"",
                            lastMover: address(0),
                            settings: gameSettings ({ startsAt: _startsAt,
                                              openInvite: openGame,
                                              totalTime: _totalTime,
                                              timeoutTime: _timeoutTime,
                                              wageSize:  _wageSize }),
                            gameBalance: msg.value 
                            });

    require((noOtherGameOnCreate(msg.sender) && noOtherGameOnCreate(_playerTwo)), "One of the players has a game in progress.");

    // if (! (_playerTwo == address(0)) ) { 
    //   games[gameId].gState = gameState.Staged;
       
    //   } 

    myLastGame[msg.sender]= gameId;
    myLastGame[_playerTwo]= gameId;
    

    // games[gameId].settings = gameSettings ({ startsAt: _startsAt,
    //                                           openInvite: openGame,
    //                                           totalTime: _totalTime,
    //                                           timeoutTime: _timeoutTime,
    //                                           wageSize:  _wageSize });

    // games[gameId].playerOne= msg.sender;
    // games[gameId].playerTwo= _playerTwo;

    // if (openGame) {
    //   games[gameId].gState = gameState.Created;
    // } else {
    //   games[gameId].gState = gameState.Staged;
    // }
    justCreatedGameId = gameId;
    
    emit newGameCreatedEvent(msg.sender,gameId);
    gameId++;

    return gameId;
  }

  function getLastGameId() public view returns(uint24) {
    return gameId-1; 
  }

  function getGame(uint24 gId) public view returns(gameData memory )  {
      return games[gId];
  }
 
  function checkAndReturnCurrentGame() public view returns (gameData memory game) {
    if ( noOtherGameOnCreate(msg.sender)) {
      return game;
    } else {
      game= games[myLastGame[msg.sender]];
      return game;
    }
    
  }

  




}
