import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import logo from '../../../assets/images/iptor_white_logo.png';

const LeftColmData = () => {
    return (
        <Container>
            <Row className="content-column">
                <Col  xs={12} md={6}>
                <Container className="left-col-data">
                <Image src={logo}  width={60} style={{ marginTop: 25 }}></Image>
                <h4>A milestone in the iptor transformation journey</h4>
                <footer className="site-footer">
                    <p>
                        Version 11 is the key  platform for distribution and publishing  businesses to turn digital disruption 
                        into digital opportunity 
                    </p>
                </footer>
                </Container>
                </Col>
                </Row>
        </Container>
    )
}

export default LeftColmData
