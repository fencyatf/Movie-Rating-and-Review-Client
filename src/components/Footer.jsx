import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs"; // Import social media icons
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer
                className="footer footer-horizontal footer-center text-white  p-10"
                style={{ background: "linear-gradient(90deg, #000000, #8B0000, #FF4500)" }} // Matching header color
            >
                {/* Navigation Links */}
                <nav className="grid grid-flow-col gap-4 mt-4">
                    <Link to="/about" className="link link-hover text-white hover:underline">
                        About us
                    </Link>

                    <Link to="/contact" className="link link-hover text-white hover:underline">
                        Contact
                    </Link>
                </nav>


                {/* Social Media Icons */}
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a href="#" className="text-warning fs-4"> {/* Yellow social media icons */}
                            <BsFacebook />
                        </a>
                        <a href="#" className="text-warning fs-4">
                            <BsTwitter />
                        </a>
                        <a href="#" className="text-warning fs-4">
                            <BsInstagram />
                        </a>
                    </div>
                </nav>

                {/* Copyright Section */}
                <aside>
                    <p className="text-white">
                        Copyright © {new Date().getFullYear()} - All rights reserved by Movie Hub
                    </p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;
