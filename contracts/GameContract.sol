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
    bytes currentGameBoard;
    address lastMover;
    gameSettings settings;
    uint gameBalance;
    bool player2accepted; 
  }
  
  mapping (uint24 => gameData) public games; 
  mapping (address => uint24) myLastGame;
  address[32] gameOwners;
  address[32] gamePlayers;

  event newGameCreatedEvent(address indexed _playerOne, address indexed _playerTwo);

////// Modifiers Start 
  modifier isOwner() {
    require (msg.sender == owner|| msg.sender == owner2 || msg.sender == owner3, "Not an Owner");
    _; 
  }

  function onMoveStateCheck(uint24 _gameid ) internal view returns(bool) {
    //do not need it, do I?
    gameData memory game=games[_gameid];
    bool g= (  game.gState == gameState.InProgress || game.gState == gameState.Staged  );
    bool notLastMover = msg.sender != game.lastMover; 
    require( g && notLastMover , "Game State: Unavailable." );
    return true;
  }

  function noOtherGameOnCreate(address player1) internal view returns(bool) {
    gameData memory lastPlayer1Game = games[myLastGame[player1]]; 

    if( (lastPlayer1Game.gState == gameState.Ended) || (lastPlayer1Game.gState == gameState.NoAssignedState) ){
      return true;
    } else {
      return false;
    }
  }
////// Modifiers END
  function initializeGame(address _playerTwo,
                          uint16 _startsAt,
                          uint16 _totalTime,
                          uint16 _timeoutTime,
                          uint _wageSize ) public payable returns(uint24 justCreatedGameId) {
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
                            gameBalance: msg.value,
                            player2accepted: false 
                            });

    require((noOtherGameOnCreate(msg.sender) && noOtherGameOnCreate(_playerTwo)), "One of the players has a game in progress.");
    myLastGame[msg.sender]= gameId;
    myLastGame[_playerTwo]= gameId;
    
    justCreatedGameId = gameId;
    
    emit newGameCreatedEvent(msg.sender,_playerTwo);
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
    game= games[myLastGame[msg.sender]];
  //   if ( noOtherGameOnCreate(msg.sender)) {
  //     return games[0];  //////??? why 
  //   } else {
  //     game= games[myLastGame[msg.sender]];
  //     return game;
  //   }
   }
  
  event player2Accepted(address indexed _player1, address indexed _player2, bool _accepted);
  
  function playerTwoAccepted(bool _accepted) public payable  {
    if (! _accepted) {
      gameData storage game =  games[myLastGame[msg.sender]];
      game.player2accepted = false;
      game.gState = gameState.Rejected;
      //or cancel? w\ no refund?
      myLastGame[game.playerOne]= 0;
      myLastGame[game.playerTwo]= 0;
      //uint tenpercent = 
      myLastGame[msg.sender] = 0; 
      //(bool success,) = msg.sender.call.value(//%palyer1deposit/gascost)()
      //norefund for now.
      emit player2Accepted(game.playerOne, game.playerTwo, false);
    } else {
      gameData storage game = games[myLastGame[msg.sender]];
      game.player2accepted = true;
      game.gState = gameState.Staged;
      emit player2Accepted(game.playerOne, game.playerTwo, true);
    }
  }
  
  
  
  event newMoveInGame(address indexed _submittedby, string indexed _prevState, string _nextState);

  function submitMove(string memory _submittedMove) public {
    bytes memory submitted = bytes(_submittedMove);
    gameData storage game= games[myLastGame[msg.sender]]; 
    string memory prevState= string(game.currentGameBoard);
    if(onMoveStateCheck(myLastGame[msg.sender])) {
      game.lastMover= msg.sender;
      game.currentGameBoard = submitted; 
    }
    
    emit newMoveInGame( msg.sender, prevState, _submittedMove);
  } 
}
