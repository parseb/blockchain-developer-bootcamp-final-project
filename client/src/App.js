import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import HomeFooter from "./components/HomeFooter";
import ChessTitle from  "./components/ChessTitle";

import "./App.css";
import { Container, Row, Spinner, Col }  from 'react-bootstrap';
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
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = GameContract.networks[networkId];
      const instance = new web3.eth.Contract(
        GameContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      
      this.getGameCount();
      
      this.checkAndReturnCurrentGame();
      // .then((g) => this.getOpenGames(g));
      //this.getOpenGames()

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  ///foo.call.value("ETH_TO_BE_SENT")("ADDITIONAL_DATA")
  getGameCount = async () => {
    const { accounts, contract } = this.state;
    let count = await contract.methods.getLastGameId().call();
    this.setState({gamesTotalCount: count});
  }

  checkAndReturnCurrentGame = async () => {
    let currentgame = await this.state.contract.methods.checkAndReturnCurrentGame().call();
    this.setState({ currentGame: currentgame });
    //console.log(currentgame); ////
    //this.render()
  }

  sendCreateGame = async (s) => {
    //console.log(s);
    const { accounts, contract, web3js } = this.state;
    //console.log("ssssssssssss")
    //console.log(s.player2Address);
    let createCall= await contract.methods.initializeGame(s.Player2Address,0,s.GamePerTime,"0",s.WagerAmount)
    .send({ from: accounts[0], value: s.WagerAmount })
  }

  playerisReady = async () => {

  }

  initializeGame = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.initializeGame();
  }



  render() {
    console.log(this.state.openGamesList);

    let createGame= () => {
      let gstate= this.state.currentGame.gState
      if(gstate == "0" || gstate == "4" ){
        return  <CreateNew contract={this.state.contract} sendCreateGame={this.sendCreateGame} blank={this.state.currentGame} userAddress={this.state.accounts[0]} /> 
      } else {
        return <ChessBoard2 state={this.state} user={this.state.accounts[0]} />
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
