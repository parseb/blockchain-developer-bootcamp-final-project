import React from "react";
import {Col, Row} from "react-bootstrap";

export default class Title {

    render(){
        return(
            <div>
                <Col></Col>
          <Col>
          <div className="Title" style={{padding:20, fontFamily: 'monospace'}}>
          
            <Row><h3>♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ </h3></Row>
            <Row><h3>♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙</h3></Row>
            <Row><h1> Chess Wager </h1></Row>
            <Row><h3>♟︎ ♟︎ ♟︎ ♟︎ ♟︎ ♟︎ ♟︎ ♟︎</h3></Row>
            <Row><h3>♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜</h3></Row>
            
          </div>
          </Col>
          <Col></Col>
          <hr />
            </div>
            
        )
    }
}