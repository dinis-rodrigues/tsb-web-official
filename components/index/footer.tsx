import React, { Fragment } from 'react'
import Subscribe from './subscribe';
import {Container,Row,Col} from 'reactstrap'
const Footer = () => (
    <Fragment>
        <Subscribe />
        <div className="app1 copyright">
            <Container>
                <Row>
                    <Col xs="12">
                        <div className="center-content">
                            <div>
                                <h6 className="copyright-text text-white">Copyright © 2021, Técnico Solar Boat</h6>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </Fragment>
)


export default Footer;