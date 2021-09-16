import React, { Component } from "react";
//import { Chessboard } from 'react-chessboard';
import { Container, Row, Button, Card, Col  } from 'react-bootstrap';
import ChessBoard2 from "./ChessBoard";

export default class HomePage extends Component {


    render() {
       
        return (
            <Container>
                
                <div class="Title" style={{padding:20}}>
                    <h3 style={{margin2Top: 20}}> Chess Wager</h3>
                </div>
                <hr />
                <Row> 
                <Card>
                    <Card.Title>?</Card.Title>
                    <Card.Body >
                        <p class="text-justify"> 
                        Chess Wager is first of all an experiement in tweeking Chess gameplay. 
                        The aim here is to experiment with in-game time and material advantage
                         as determinants of a continously enacted win/loss ratio.   
                        </p> 
                        <p>
                        <hr />
                        </p>
                        
                    </Card.Body>                     
                </Card>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Title>Join a Game:</Card.Title>
                            <Card.Body>     </Card.Body>
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

