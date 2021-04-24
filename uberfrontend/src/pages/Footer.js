// import React , { Fragment } from 'react';
// import { Container, Navbar, Nav } from 'react-bootstrap';
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
// import route from '../components/Appbar';

import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyle";

const Footer = () => {
  return (

    <Box>
    <h2 style={{ color: "white", 
                 textAlign: "center", 
                 marginTop: "-50px" }}>
      Uber Bus
    </h2>
    <br></br>
    <Container>
      <Row>
        <Column>
          <Heading>About Us</Heading>
          <FooterLink href="https://www.uber.com/us/en/about/">Aim</FooterLink>
          <FooterLink href="https://www.uber.com/newsroom/">News Link</FooterLink>
        </Column>
        <Column>
          <Heading>Services</Heading>
          <FooterLink href="https://www.uber.com/us/en/about/uber-offerings/">Our Offerings</FooterLink>
          <FooterLink href="https://www.uber.com/us/en/careers/">Career</FooterLink>
          <FooterLink href="https://www.uber.com/us/en/careers/">Career Blog</FooterLink>
          <FooterLink href="#">Teaching</FooterLink>
        </Column>
        <Column>
          <Heading>Products</Heading>
          <FooterLink href="https://www.uber.com/us/en/drive/">Drive</FooterLink>
          <FooterLink href="https://www.ubereats.com/?_ga=2.145830323.649056551.1619285155-1863976061.1619285155&uclick_id=70184b1e-f44c-4b26-9347-4116025a2862">Eat</FooterLink>
          <FooterLink href="https://www.uber.com/us/en/ride/">Ride</FooterLink>
          <FooterLink href="#">Teaching</FooterLink>
        </Column>
        <Column>
          <Heading>Social Media</Heading>
          <FooterLink href="https://www.facebook.com/uber?uclick_id=70184b1e-f44c-4b26-9347-4116025a2862">
            <i className="fab fa-facebook-f">
              <span style={{ marginLeft: "10px" }}>
                Facebook
              </span>
            </i>
          </FooterLink>
          <FooterLink href="https://www.instagram.com/uber/?uclick_id=70184b1e-f44c-4b26-9347-4116025a2862">
            <i className="fab fa-instagram">
              <span style={{ marginLeft: "10px" }}>
                Instagram
              </span>
            </i>
          </FooterLink>
          <FooterLink href="https://twitter.com/uber?uclick_id=70184b1e-f44c-4b26-9347-4116025a2862">
            <i className="fab fa-twitter">
              <span style={{ marginLeft: "10px" }}>
                Twitter
              </span>
            </i>
          </FooterLink>
          <FooterLink href="https://www.youtube.com/channel/UCgnxoUwDmmyzeigmmcf0hZA">
            <i className="fab fa-youtube">
              <span style={{ marginLeft: "10px" }}>
                Youtube
              </span>
            </i>
          </FooterLink>
        </Column>
      </Row>
    </Container>
  </Box>
);


  };
   


export default Footer;