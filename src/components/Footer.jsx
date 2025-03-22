import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs"; // Import social media icons

const Footer = () => {
    return (
        <div>
            <footer
                className="footer footer-horizontal footer-center text-white rounded p-10"
                style={{ background: "linear-gradient(90deg, #0D47A1, #1976D2)" }} // Matching header color
            >
                {/* Navigation Links */}
                <nav className="grid grid-flow-col gap-4 mt-4">
                    <a href="/about" className="link link-hover text-white hover:underline">
                        About us
                    </a>
                    <a href="/contact" className="link link-hover text-white hover:underline">
                        Contact
                    </a>
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
