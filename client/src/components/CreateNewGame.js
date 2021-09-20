import  React, {Component, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default class CreateNew extends Component {
 
      constructor(props) {
		super(props)
		this.state = {
            wageSize:0.1,
            WagerAmount:0.1,
            Player2Address:0,
            Player1Address:this.props.userAddress,
            GamePerTime:0
		}
       
	}


  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
    
  handleWageChange = (e) => {
    this.setState({WagerAmount: e.target.value})
    console.log(this.state);
  }

  handlePlayer2Change = (e) => {
    this.setState({Player2Address: e.target.value})
    console.log(this.state);
  }

  handleGamePerTimeChange = (e) => {
    this.setState({GamePerTime: e.target.value})
    console.log(this.state);
  }

    

    render() {
        if(this.props.blank.gState == "0") {
            return ( 
                <Container>
                    <Row className="justify-content-md-center"> 
                        <Col></Col>
                        <Col>
                    <h3> Create New Game</h3>
                        <Form style={{ width: '500px' }}>
                        <Form.Group className="mb-3" controlId="Player1Address">
                            <Form.Label>Player 1</Form.Label>
                            <Form.Control type="text readonly" value={this.props.userAddress}  readOnly />
                            <Form.Text className="text-muted">
                                Your current address
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Player2Address">
                            <Form.Label>Player 2</Form.Label>
                            <Form.Control type="text" placeholder="0x0000000000000000000000000000000000000000" onChange={this.handlePlayer2Change}/>
                            <Form.Text className="text-muted">
                                Your opponent's address
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="GamePerTime">
                            <Form.Label>Minutes Per Player </Form.Label>
                            {/* <Form.Range type="number" placeholder="5" /> */}
                            <Form.Control type="number" defaultValue="5" min="5" max="30" onChange={this.handleGamePerTimeChange}/>
                            <Form.Text className="text-muted">
                                Minutes per player between (min. 5 max. 30 )
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="WagerAmount">
                            <Form.Label>Wage Amount</Form.Label>
                            {/* <Form.Range type="number" placeholder="5" /> */}
                            <Form.Control type="number" step="0.01" defaultValue="0.01" min="0.01" max="306" onChange={this.handleWageChange}  />
                            <Form.Text className="text-muted">
                                Minutes per player between (min. 5 max. 30 )
                            </Form.Text>
                        </Form.Group>
                        <Form.Group> 
                            <Button variant="outline-dark"  onClick={this.handleNewGameSubmit()}>
                                Create Game
                            </Button>
                        </Form.Group>
                        
                        </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                    <br />
                </Container>
                
                )
        } else {
           return( <h6> Game in Progress</h6> )
        }
        
    }

}
