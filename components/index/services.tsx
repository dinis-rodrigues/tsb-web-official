import React from 'react'
import {Container,Row,Col} from 'reactstrap'
import Image from "next/image"
const Services = () => (
    <section className="services" id="service">
        <Container>
            <Row>
                <Col md="8"  className="offset-md-2">
                    <div className="title">
                        <div className="main-title">
                            <h2>Advance Services</h2>
                        </div>
                        <div className="sub-title">
                           <p className="para">Técnico Solar Boat is an university project consisting of cross-degree engineering students at Instituto Superior Técnico that work together on the development of two unique vessels, a solar and a hydrogen powered boat. Its main purpose is to participate in worldwide engineering competitions organized by Solar Sport One and Yatch Club de Monaco.</p> 
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="service service-overlay">
                        <div className="img-block">
                            <Image alt="" className="service-img img-fluid" src="/assets/images/app_landing1/icons/1-1.png" width={"100%"} height={"100%"}/>
                        </div>
                        <div className="service-feature">
                            <h4 className="feature-text">Powerful System</h4>
                            <p>There are many variations of passages of Lorem Ipsum available, but the ma- jority have
                                suffered.</p>

                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="service service-overlay">
                        <div className="img-block">
                            <Image alt="" className="service-img img-fluid" src="/assets/images/app_landing1/icons/1-2.png" width={"100%"} height={"100%"}/>
                        </div>
                        <div className="service-feature">
                            <h4 className="feature-text">Personalization</h4>
                            <p>There are many variations of passages of Lorem Ipsum available, but the ma- jority have
                                suffered.</p>
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="service service-overlay">
                        <div className="img-block">
                            <Image alt="" className="service-img img-fluid" src="/assets/images/app_landing1/icons/1-3.png" width={"100%"} height={"100%"}/>
                        </div>
                        <div className="service-feature">
                            <h4 className="feature-text">Ease Of Access</h4>
                            <p>There are many variations of passages of Lorem Ipsum available, but the ma- jority have
                                suffered.</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
)


export default Services;