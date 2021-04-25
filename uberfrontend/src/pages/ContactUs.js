import React, { Component } from 'react';
import { Container, Col, Image, Row } from 'react-bootstrap';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import DialpadIcon from '@material-ui/icons/Dialpad';
import EmailIcon from '@material-ui/icons/Email';
import FormContact from './FormContact'
import contactus from '../styles/images/contactus.jpeg'
import Footer from "./Footer";

import '../styles/contact.css'
export default class Home extends Component {
    render() {
        return (<div>
            <div className="content-wrapper" style={{
                paddingTop: '80px'

            }} >
                <Image src={contactus} />
                <h2 className="heading">Contact Us</h2>

            </div>
            <Container>
                <Row className="show-grid text-center">
                    <Col xs={12} sm={6} >
                        <h3>Contact Our Agency</h3>
                        <p>
                            At Travel Agency we want to make sure that your trip is everything you could possibly dream of. Whether you want inspiration and guidance in planning your next adventure or need help with an existing booking, our travel experts are here to help.
                            Send us an email or give our team a call to book your flights, plan your adventure or get help with any problems you encounter along the way. Or if you’re in New York, you can visit us in store to speak face to face. Our assistance doesn’t end when you take off either. Our Global Travel Help team are on hand to assist with any issues you may have.
                    </p>
                    </Col>

                    <Col xs={12} sm={6} className="person-wrapper">
                        <h3>Our contacts </h3>
                        <ul className=" contact-list fa-ul">
                            <BusinessIcon />123/21 First Street, Boston, Huntington Street, MA United States, 02115
                            <br></br>
                            <br></br>
                            <PhoneIcon />345-677-554
                            <br></br>
                            <br></br>
                            <DialpadIcon /> 323-678-567
                            <br></br>
                            <br></br>
                            <EmailIcon />uberbus@gmail.com
                            <br></br>
                            <br></br>
                        </ul>

                    </Col>
                </Row>
                <footer>
                    <div className="Footer">
                        <Footer />
                    </div>
                </footer>
            </Container>


        </div>)
    }
}