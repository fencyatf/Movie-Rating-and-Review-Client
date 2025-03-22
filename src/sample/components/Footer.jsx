import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-dark text-white p-4 ">
      <nav className="grid grid-flow-col gap-6">
        <Link to="/about" className="link link-hover hover:text-gray-400">About us</Link>
        <Link to="/contact" className="link link-hover hover:text-gray-400">Contact</Link>
      </nav>

      {/* Social Media Icons */}
      <nav className="text-white mt-2">
        <div className="grid grid-flow-col gap-6">
          {/* Twitter Icon */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hover:text-gray-400">
              <path d="M22.46 6c-.77.34-1.6.57-2.46.67a4.13 4.13 0 001.82-2.28 8.36 8.36 0 01-2.6 1 4.12 4.12 0 00-7 3.75A11.71 11.71 0 013 5.15a4.12 4.12 0 001.28 5.5 4 4 0 01-1.86-.52v.05a4.12 4.12 0 003.3 4 4.19 4.19 0 01-1.85.07 4.12 4.12 0 003.84 2.85A8.26 8.26 0 012 18.29a11.64 11.64 0 006.29 1.84c7.55 0 11.67-6.26 11.67-11.67q0-.27 0-.54A8.24 8.24 0 0022.46 6z" />
            </svg>
          </a>

          {/* YouTube Icon */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hover:text-gray-400">
              <path d="M10 15l6-4-6-4v8zm12-9.88v13.76A2.12 2.12 0 0119.88 21H4.12A2.12 2.12 0 012 18.88V5.12A2.12 2.12 0 014.12 3h15.76A2.12 2.12 0 0122 5.12z" />
            </svg>
          </a>

          {/* Facebook Icon */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hover:text-gray-400">
              <path d="M9 8H6v4h3v12h5V12h3.64l.36-4H14V6.67C14 5.72 14.2 5.33 15.13 5.33h2.87V0h-3.81C10.53 0 9 1.58 9 4.62V8z" />
            </svg>
          </a>
        </div>
      </nav>

      <aside className="mt-2 text-gray-400 text-sm">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Movie Hub</p>
      </aside>
    </footer>
  );
};
