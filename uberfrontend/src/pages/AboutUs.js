import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Image, Button, Row, Grid } from "react-bootstrap";
import "../styles/about.css";
import Footer from "./Footer";
import ubar3 from "../styles/images/uber5.jpeg";
import about1 from "../styles/images/about1.jpeg";
import sayali from "../styles/images/sayali.jpeg";
import mahitha from "../styles/images/mahitha.jpeg";

export default class About extends Component {
  render() {
    return (
      <div>
        <div
          className="content-wrapper"
          style={{
            paddingTop: "80px",
          }}
        >
          <Image src={about1} />
          <h2 className="heading">About Us</h2>
        </div>

        {/* <div className="content-wrapper">    
                    <Image src="/assets/img/about.jpg" height="400" width="100%"/>
                    <h2 className="heading" className="text-center">About Us </h2>
                    <hr></hr>
                    
                </div> */}
        <Container>
          {/* <Col xs={12} sm={8} smOffset={2}    > */}
          <Image
            src={ubar3}
            className="about-pc"
            rounded
            height="300"
            width="500"
            class="center"
          />
          <h3 className="text-center">Traveling. Tours. Adventure.</h3>

          <p>
            We are committed to offering travel services of the highest quality,
            combining our energy and enthusiasm, with our years of experience.
            Our greatest satisfaction comes in serving large numbers of
            satisfied clients who have experienced the joys and inspiration of
            travel.
          </p>

          <p>
            Behaviour we improving at something to. Evil true high lady roof men
            had open. To projection considered it precaution an melancholy or.
            Wound young you thing worse along being ham. Dissimilar of
            favourable solicitude if sympathize middletons at. Forfeited up if
            disposing perfectly in an eagerness perceived necessary. Belonging
            sir curiosity discovery extremity yet forfeited prevailed own off.
            Travelling by introduced of mr terminated. Knew as miss my high hope
            quit. In curiosity shameless dependent knowledge up. Whether article
            spirits new her covered hastily sitting her. Money witty books nor
            son add. Chicken age had evening believe but proceed pretend mrs. At
            missed advice my it no sister. Miss told ham dull knew see she spot
            near can. Spirit her entire her called.
          </p>

          {/* </Col> */}
        </Container>
        <br></br>
        <br></br>
        <Container fluid className="team">
          <h1 className="text-center"> Our team</h1>
          <h5 className="text-center">
            An experienced team of people passionate about traveling
          </h5>
          <Container>
            <Row className="show-grid text-center">
              <Col xs={12} sm={4} className="person-wrapper">
                <Image
                  src={sayali}
                  circle
                  className="profile-pic"
                  height="200"
                  width="200"
                />
                <h3>Sayali Pathare</h3>
                <h5>Founder and Director</h5>
                <p>
                  “Sayali was an excellent Travel Agent for us and considered
                  our unique needs as she planned our itinerary. Every
                  suggestion she made was excellent.”{" "}
                </p>
              </Col>

              <Col xs={12} sm={4} className="person-wrapper">
                <Image
                  src={mahitha}
                  circle
                  className="profile-pic"
                  height="200"
                  width="200"
                />
                <h3>Shiva Mahitha Maddi</h3>
                <h5>Senior Travel Agent</h5>
                <p>
                  “I would highly recommend Andy because everything on my month
                  long trip to New Zealand, Australia and French Polynesia went
                  without a hitch.”
                </p>
              </Col>

              <Col xs={12} sm={4} className="person-wrapper">
                <Image
                  src="/assets/img/person2.jpg"
                  circle
                  className="profile-pic"
                  height="200"
                  width="200"
                />
                <h3>John Smith</h3>
                <h5>Hotel Agent</h5>
                <p>
                  “I would highly recommend Andy because everything on my month
                  long trip to New Zealand, Australia and French Polynesia went
                  without a hitch.”{" "}
                </p>
              </Col>
            </Row>
          </Container>
          <footer>
            <div className="Footer">
              <Footer />
            </div>
          </footer>
        </Container>
      </div>
    );
  }
}
