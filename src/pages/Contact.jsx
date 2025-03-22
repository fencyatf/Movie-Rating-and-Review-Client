import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Card, Container } from 'react-bootstrap';

function Contact() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phoneNumber: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // 📌 Save form data to Local Storage
    localStorage.setItem("contactForm", JSON.stringify(formData));

    alert("Form submitted successfully! (Saved in Local Storage)");

    // 📌 Clear the form fields after submission
    setFormData({
      fullName: "",
      username: "",
      phoneNumber: "",
      message: "",
    });

    setValidated(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg rounded" style={{ maxWidth: '500px', width: '100%' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Contact Us</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              {/* Full Name */}
              <Form.Group as={Col} md="12" controlId="validationFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Full name is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Username */}
            <Form.Group className="mb-3" controlId="validationUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Phone Number */}
            <Form.Group className="mb-3" controlId="validationPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="^\d{10,}$"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid phone number (at least 10 digits).
              </Form.Control.Feedback>
            </Form.Group>

            {/* Message */}
            <Form.Group className="mb-3" controlId="validationMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a message.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Submit Button */}
            <Button type="submit" className="w-100">Submit Form</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Contact;
