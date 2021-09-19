import  React, {Component} from "react";
import { Container, Row, Col, Form, Range } from "react-bootstrap";

export default class CreateNew extends Component {

    componentDidMount() {

    }

    render() {
        if(this.props.blank.gState == "0") {
            return ( 
                <Container>
                    <Row className="justify-content-md-center"> 
                        <Col></Col>
                        <Col>
                    <h3> Create New Game</h3>
                        <Form>
                        <Form.Group className="mb-3" controlId="player1Address">
                            <Form.Label>Player 1</Form.Label>
                            <Form.Control type="text readonly" value={this.props.userAddress} readOnly />
                            <Form.Text className="text-muted">
                                Your current address
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="player2Address">
                            <Form.Label>Player 2</Form.Label>
                            <Form.Control type="text" placeholder="0x0000000000000000000000000000000000000000" />
                            <Form.Text className="text-muted">
                                Your opponent's address
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="gamePerTime">
                            <Form.Label>Minutes Per Player </Form.Label>
                            {/* <Form.Range type="number" placeholder="5" /> */}
                            <Form.Control type="number" defaultValue="5" min="5" max="30" />
                            <Form.Text className="text-muted">
                                Minutes per player between (min. 5 max. 30 )
                            </Form.Text>
                        </Form.Group>
                        </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
                
                )
        } else {
           return( <h6> Game in Progress</h6> )
        }
        
    }

}
