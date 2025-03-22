import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container, Dropdown } from "react-bootstrap";
import { axiosInstance } from "../config/axiosInstance";

export const Header = () => {
  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch categories from backend
  useEffect(() => {
    axiosInstance
      .get("api/categories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg"  >{/* className="flex flex-col min-h-screen" */}
      <Container>
        {/*  Logo with Film Icon */}
        <Navbar.Brand href="/" className="text-primary fw-bold">
          <i className="bi bi-film me-2"></i> MOVIE HUB
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          {/* Search Bar */}
          <Form className="d-flex mx-auto w-50 gap-2">
            {/* Categories Dropdown */}
            <Dropdown className="flex-shrink-0">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <Dropdown.Item key={index} href={`#category-${category._id}`}>
                      {category.name}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>Loading...</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Search Bar */}
            <FormControl type="search" placeholder="Search IMDb" className="gap-2" />

            {/* Search Button (DaisyUI) */}
            <button className="btn btn-outline btn-primary">
              <i className="bi bi-search"></i>
            </button>
          </Form>


          {/* Navigation Links */}
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/movies/:id" className="text-white">Movie Details</Nav.Link>
            <Nav className="ms-auto d-flex gap-3">
              <button className="btn btn-outline-light" onClick={() => window.location.href = "/login"}>Login</button>
              <button className="btn btn-primary" onClick={() => window.location.href = "/signup"}>Signup</button>
            </Nav>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
