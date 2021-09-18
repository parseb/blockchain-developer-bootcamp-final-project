import React, { Component } from "react";
//import { Chessboard } from 'react-chessboard';
import { Container, Row, Button, Card, Col  } from 'react-bootstrap';
import ChessBoard2 from "./ChessBoard";
import { gameList } from "./gameJoinComponent";


export default class HomePage extends Component {


    render() {
       
        return (
            <Container>
                
                <div className="Title" style={{padding:20}}>
                    <h3 style={{margin2Top: 20}}> Chess Wager</h3>
                </div>
                <hr />
                <Row> 
                <Card>
                    <Card.Title>?</Card.Title>
                    <Card.Body >
                        <p className="text-justify"> 
                        Chess Wager is first of all an experiement in tweeking Chess gameplay. 
                        The aim here is to experiment with in-game time and material advantage
                         as determinants of a continously enacted win/loss ratio.   
                        </p> 
                        <p>
                        
                        </p>
                        <hr />
                    </Card.Body>                     
                </Card>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Title>Join a Game:</Card.Title>
                            <Card.Body>
                                {/* <gameList g={this.state.openGamesList} /> */}
                              Unavailable
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <Card.Title>Create a New Game:</Card.Title>
                            <Card.Body>     </Card.Body>
                    </Col>
                </Row>
                
                
            </Container>
            
        ); 
        
    }
}

