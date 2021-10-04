import React, { Component } from "react";

import getWeb3 from "./getWeb3";

import HomeFooter from "./components/HomeFooter";
import ChessTitle from  "./components/ChessTitle";

import "./App.css";
import { Container, Row, Spinner, Col, Button }  from 'react-bootstrap';
import GameContract from "./contracts/GameContract.json";
import CreateNew from "./components/CreateNewGame";
import ChessBoard2 from "./components/ChessBoard";


class App extends Component {
  state = { 
             web3: null, 
             accounts: null, 
             contract: null,
             gamesTotalCount: 0,
             openGamesList: [],
             currentGame: {},
            }

  componentDidMount = async () => {
    try {

      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = GameContract.networks[networkId];
      const instance = new web3.eth.Contract(
        GameContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance });


    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    this.getGameCount();
      
    this.checkAndReturnCurrentGame();

    this.eventListen(); 
  }

  getGameCount = async () => {
    let contract  = this.state.contract;
    let count = await contract.methods.getLastGameId().call();
    this.setState({gamesTotalCount: count});
  }

  checkAndReturnCurrentGame = async () => {
    const { accounts, contract, web3js } = this.state;
    const currentgame = await this.state.contract.methods.checkAndReturnCurrentGame().call();
    this.setState({ currentGame: currentgame });
    console.log("this is current game")
    console.log(currentgame); 
   
  }

  sendCreateGame = async (s) => {
  
    const { accounts, contract, web3js } = this.state;
 
    let createCall= await contract.methods.initializeGame(s.Player2Address,0,s.GamePerTime,"0",s.WagerAmount)
    .send({ from: accounts[0], value: s.WagerAmount })
  }

  acceptGameInvite= async () =>{
    console.log("clicked Accepted")
    const { accounts, contract, web3js } = this.state;
    let createCall= await contract.methods.playerTwoAccepted(true)
    .send({from: accounts[0], value: this.state.currentGame.settings.wageSize});

  }

  declineGameInvite= async () =>{
    console.log("clicked Accepted")
    const { accounts, contract, web3js } = this.state;
    let createCall= await contract.methods.playerTwoAccepted(false)
    .send({from: accounts[0], value: 0});

  }

  eventListen= async () => {
    let contract  = await this.state.contract;
    console.log("CONNNTRRACTT", contract)
    contract.events.allEvents({
      // filter: {myIndexedParam: [20,23]}, // Using an array means OR: e.g. 20 or 23
      // fromBlock: 'latest'
  }, function(error, event){ 
    console.log(event);
  })
  
  //this.checkAndReturnCurrentGame();//////////!!!!!!!!!!!!!!!
  
  
  .on("connected", function(subscriptionId){
      console.log(subscriptionId);
  })
  .on('data', function(event){
      
      console.log(event); 
  })
  .on('changed', function(event){
      // remove event from local database
  })
  .on('error', function(error, receipt) {
      console.log("Error Event:", error)
  });
  
  };
  
  render() {
  
    const gamestates= {0:"Stateless", 1: "Staged", 2:"In Progress", 3: "Ended", 4: "Rejected"}
    const createGame= () => {
      const gstate= this.state.currentGame.gState
      console.log(this.state.currentgame, "----gstate")
      if(gstate == "0" || gstate == "4" ){
        return  <CreateNew contract={this.state.contract} sendCreateGame={this.sendCreateGame} blank={this.state.currentGame} userAddress={this.state.accounts[0]} /> 
      } else {
        return <ChessBoard2 state={this.state} user={this.state.accounts[0]} />
      }
    }

    const acceptGameButton = () => {
      if (this.state.currentGame[0] == this.state.accounts[0]) {
        return  ( <h6> Invite Accepted: {String(this.state.currentGame.player2accepted)} </h6>)
      } else if (this.state.currentGame[1] == this.state.accounts[0]) {
        return(
      <Col>
        <Row> 
            <Col>
              <Button variant="outline-success"  onClick={this.acceptGameInvite}>
                Accept Game {this.state.currentGame.settings.wageSize}
              </Button>
            </Col>
            <Col>
              <Button variant="outline-danger"  onClick={this.declineGameInvite}>
                Decline Game
              </Button>
            </Col>
        </Row>
        <Row>
          [Player 2 Response Timeout: 10 minutes] 
        </Row>
      </Col>
        )
      }
    }

     if (!this.state.web3) {
       return (  
         <Container>
           <Row id='loading spinners'> 
              <Spinner animation="grow" variant="danger"  />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="secondary" />
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
           </Row>
           <br />
          <h3> Loading Web3, accounts, and contract...   </h3>
         </Container>
            );
     }

    return (
      
        <div className="App">
          <Container>
          <ChessTitle />
          <Row> 
            <Col xs lg="8">
              {this.state.currentGame[0]}
              {createGame()}
              {this.state.currentGame[1]}
            </Col>           
            <Col xs lg="4">
              <hr />
              <Row>
                <h6> Game State: {gamestates[this.state.currentGame.gState]} </h6>
              </Row>
              <hr /> 
              <Row>
                {acceptGameButton()}
              </Row>
              <hr />
              <Row></Row>
              <hr />
              <Row></Row>
              <hr />
            </Col> 
          </Row>
          {/* get user account accounts[0] might return wrong one --check @#TODO */}
          <HomeFooter state={this.state} />
          </Container>
        </div>
    );
  }
}

export default App;
