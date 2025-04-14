import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Footer.css"; 

const Footer = () => {
    return (
        <footer className="custom-footer text-white">
            {/* Navigation Links */}
            <nav className="footer-links">
                <Link to="/about" className="footer-link">About Us</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
            </nav>

            {/* Social Media Icons */}
            <div className="footer-icons">
                <a href="#" className="social-icon"><BsFacebook /></a>
                <a href="#" className="social-icon"><BsTwitter /></a>
                <a href="#" className="social-icon"><BsInstagram /></a>
            </div>

            {/* Copyright */}
            <div className="footer-copy">
                <p>© {new Date().getFullYear()} Movie Hub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
