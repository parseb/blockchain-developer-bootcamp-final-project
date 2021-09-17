import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import HomePage from "./components/HomePage";

import "./App.css";
import { Container, Row, Spinner }  from 'react-bootstrap';
import GameContract from "./contracts/GameContract.json";

class App extends Component {
  state = { storageValue: 0,
             web3: null, 
             accounts: null, 
             contract: null,
             gamesTotalCount: 0 };

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
      this.setState({ web3, accounts, contract: instance, openGamesList: [] }, this.getGameCount, this.getOpenGames);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getGameCount = async () => {
    const { accounts, contract } = this.state;
    let count = await contract.methods.getLastGameId().call();
    this.setState({gamesTotalCount: count});
  }


  getOpenGames = async () => {
    const { accounts, contract } = this.state;

    let openGames = await contract.methods.getOpenGames();
    
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();



    // Update state with the result.
    this.setState({ storageValue: response });
  };

  initializeGame = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.initializeGame();
  }



  render() {
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
          <h6> {this.state.gamesTotalCount} </h6>
        <HomePage />
        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
      </Container>
      
    );
  }
}

export default App;
