import React , { Fragment } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import route from '../components/Appbar';

const Footer = () => (
  <div className="row">   
    {/* <Fragment>
    <Navbar className="bg-dark"> 
        <Nav className="m-auto">
            <Nav.Link to="/privacy" className="nav-link">
                Privacy
            </Nav.Link>
            <Nav.Link to="/terms" className="nav-link">
                Terms &amp; Conditions
            </Nav.Link>
            <Nav.Link to="/policy" className="nav-link">
                Policy
            </Nav.Link>
        </Nav>
    </Navbar>
    </Fragment> */}
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  </div>
   
);

export default Footer;