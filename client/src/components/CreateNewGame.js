import  React, {Component, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default class CreateNew extends Component {
 
      constructor(props) {
		super(props)
		this.state = {
			list: []
		}
	}
    
     
       
    zhandleChange(e)  {
        console.log(e.target.id)
        if (String(e.target.id) == "cPlayer2Address"){
            
            this.setState({cPlayer2Address: e.target.value})
        }
        else if (e.target.id == "cWagerAmount") {
            this.setState({cWagerAmount: e.target.value})
        }
        else if (e.target.id == "cGamePerTime") {
            this.setState({cGamePerTime: e.target.value})
        }

        
      
    }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
    
    

    

    handleNewGameSubmit() {
    
        
        
        ///this.setState({createGameValues: event.target.value});
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
                        <Form.Group className="mb-3" controlId="cPlayer1Address">
                            <Form.Label>Player 1</Form.Label>
                            <Form.Control type="text readonly" value={this.props.userAddress}  readOnly />
                            <Form.Text className="text-muted">
                                Your current address
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cPlayer2Address">
                            <Form.Label>Player 2</Form.Label>
                            <Form.Control type="text" placeholder="0x0000000000000000000000000000000000000000"  />
                            <Form.Text className="text-muted">
                                Your opponent's address
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cGamePerTime">
                            <Form.Label>Minutes Per Player </Form.Label>
                            {/* <Form.Range type="number" placeholder="5" /> */}
                            <Form.Control type="number" defaultValue="5" min="5" max="30"  />
                            <Form.Text className="text-muted">
                                Minutes per player between (min. 5 max. 30 )
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cWagerAmount">
                            <Form.Label>Wage Amount</Form.Label>
                            {/* <Form.Range type="number" placeholder="5" /> */}
                            <Form.Control type="number" step="0.01" defaultValue="0.01" min="0.01" max="306"  />
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
