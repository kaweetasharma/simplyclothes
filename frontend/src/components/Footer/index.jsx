// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ categories }) => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Quick Links Section */}
          <Col md={4} className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </Col>

          {/* Categories Section */}
          <Col md={4} className="footer-section">
            <h4>Categories</h4>
            <ul className="footer-links">
              {categories.map((category) => (
                <li key={category}>
                  <Link to={`/search?category=${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Us Section */}
          <Col md={4} className="footer-section">
            <h4>Contact Us</h4>
            <p>123 Fashion Street, Vogue City, VC 12345</p>
            <p>Email: support@voguevibe.com</p>
            <p>Phone: +1 (234) 567-890</p>
            <div className="social-icons">
              <a href="https://facebook.com">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://twitter.com">
                <i className="fab fa-twitter-square"></i>
              </a>
              <a href="https://instagram.com">
                <i className="fab fa-instagram-square"></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p className="footer-bottom">
              All rights reserved &copy; VogueVibe 2024
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
