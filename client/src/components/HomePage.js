import React, { Component } from "react";
import { Chessboard } from 'react-chessboard';
import Container from 'react-bootstrap/Container';
import ChessBoard2 from "./ChessBoard";

export default class HomePage extends Component {
  


    render() {

        return (
            <div id="HomePage" width="100%">
                <Chessboard id="BasicBoard" style="margin: 0 auto" />
                <ChessBoard2 />
            </div>
                
        ) 
        
    }
}

