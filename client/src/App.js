import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import HomePage from "./components/HomePage";

import "./App.css";
import { Container, Row, Spinner }  from 'react-bootstrap';
import GameContract from "./contracts/GameContract.json";
import CreateNew from "./components/CreateNewGame";

class App extends Component {
  state = { 
             web3: null, 
             accounts: null, 
             contract: null,
             gamesTotalCount: 0,
             openGamesList: [],
             currentGame: {} }

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
    console.log(currentgame); ////
    //this.render()
  }

  sendCreateGame = async () => {

  }

  playerisReady = async () => {

  }

  

  // getOpenGames = (gamecount) => {
  //   const { contract } = this.state;
  //   //console.log("I was here dawg!!!!!!!!!!!!!!!!!!");
  //   let opengammes=[];
  //   let agame= async (e) => { return contract.methods.getGame(e).call()};

  //   if ( gamecount > 10 ) {
  //     for(let z=gamecount; z>gamecount -10; z--) {
  //       //let agame=await contract.methods.getOpenGames(z);
  //       //console.log(agame);
  //       opengammes.push(agame(z));
  //     }
  //   } else {
  //     [...Array(gamecount).keys()].forEach( e => {
      
  //       opengammes.push(agame(e));
  //       console.log("HEREEE")
  //       console.log(agame(e));
  //     } 
  //     )
  //   }
    
  //   this.setState({openGamesList:opengammes});
    
    
  // }

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();



  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  initializeGame = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.initializeGame();
  }



  render() {
    console.log(this.state.openGamesList);
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
      <Container>
        <div className="App">
          <div className="Title" style={{padding:20}}>
                      <h2 style={{margin2Top: 20}}> Chess Wager</h2>
          </div>
          <hr />
          <CreateNew />
          <HomePage state={this.state} />
        </div>
      </Container>
      
    );
  }
}

export default App;
