import React, { Component } from "react";
//import { Chessboard } from 'react-chessboard';
import { Container, Row, Button, Card, Col, Navbar  } from 'react-bootstrap';
import ChessBoard2 from "./ChessBoard";
import { gameList } from "./gameJoinComponent";


export default class HomePage extends Component {


    render() {
       
        return (
            <Container>
                
                
                <Row> 
                
                </Row>
                
                
                
            

                <Navbar fixed="bottom" >
 
                <Card>
                    <Card.Title>?</Card.Title>
                    <Card.Body >
                        <p className="text-justify"> 
                        Chess Wager is first of all an experiement in tweeking Chess gameplay. 
                        The aim here is to experiment with in-game time and material advantage
                         as determinants of a continously enacted win/loss ratio.   
                        </p> 
                        <p>
                        <h6> Total games played: {this.props.state.gamesTotalCount} </h6>
                        </p>
                        <hr />
                    </Card.Body>                     
                </Card>
            </Navbar>
            </Container> 
        ); 
        
    }
}

