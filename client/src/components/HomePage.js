import React, { Component } from "react";
import { Chessboard } from 'react-chessboard';

export default class HomePage extends Component {
  


    render() {

        return (
            <div>
                <Chessboard id="BasicBoard" />
            </div>
        ) 
        
    }
}

