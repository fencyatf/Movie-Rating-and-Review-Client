import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-4">
      <Container>
        <Row className="mb-3">
          <Col>
            <ul className="list-inline">
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white text-decoration-none">
                  Our Services
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="mb-0">
              Copyright © 2025 Food Kart | Designed by Fathima Fency
            </h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
