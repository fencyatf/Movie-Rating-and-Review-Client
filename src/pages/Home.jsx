import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const trendingMalayalamMovies = [
  {
    id: 1,
    title: "2018",
    poster: "https://www.zonkerala.com/movies/gallery/2018/malayalam-film-2018-latest-pictures-7341.jpg",
    rating: "★★★★★",
    description: "A survival thriller depicting the Kerala floods of 2018 and the resilience of its people.",
  },
  {
    id: 2,
    title: "RDX",
    poster: "https://pics.filmaffinity.com/RDX_Robert_Dony_Xavier-556848212-large.jpg",
    rating: "★★★★☆",
    description: "An action-packed drama about three friends and their fight against injustice.",
  },
  {
    id: 3,
    title: "Manjummel Boys",
    poster: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cf212a192636849.65def29b8ff6a.jpg",
    rating: "★★★★★",
    description: "A thrilling story of friendship and survival, inspired by real events.",
  },
  {
    id: 4,
    title: "Bramayugam",
    poster: "https://m.media-amazon.com/images/M/MV5BNzc4OTY4ODUtNGI5Mi00MzhhLTlhYTEtYTk0Nzk1ODU2YWJkXkEyXkFqcGdeQXVyMTE5NjE5Mjc2._V1_.jpg",
    rating: "★★★★☆",
    description: "A dark and mysterious horror-thriller set in ancient Kerala.",
  },
];

const Home = () => {
  const isUserAuth = !!localStorage.getItem("token");
  const navigate = useNavigate();

  // Redirect logged-in users to the user dashboard home
  // if (isUserAuth) {
  //   navigate("/");
  // }

  return (
    <>
      {/* Public Hero Section with Carousel */}
      <section className="text-center py-5 bg-dark text-white">
        <Container>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src="https://www.metacritic.com/a/img/resize/b7768de584471cee11e2ba1fe1c90af03285c973/catalog/provider/2/13/2-8bf95b5035fb009338ff590ab90c705d.jpg?auto=webp&fit=crop&height=675&width=1200" alt="First slide" />
              <Carousel.Caption>
                <h3>2018</h3>
                <p>A survival thriller depicting the Kerala floods of 2018 and the resilience of its people.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="https://images.indianexpress.com/2023/08/rdx.jpg" alt="Second slide" />
              <Carousel.Caption>
                <h3>RDX</h3>
                <p>An action-packed drama about three friends and their fight against injustice.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="https://totalreporter.com/wp-content/uploads/2024/02/Manjummel-Boys-1024x512.jpg" alt="Third slide" />
              <Carousel.Caption>
                <h3>Manjummel Boys</h3>
                <p>A thrilling story of friendship and survival, inspired by real events.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <h1 className="display-4 mt-4">Rate Your Favorite Movies</h1>
          <p className="lead">Explore reviews, ratings, and trending cinema!</p>
        </Container>
      </section>

      {/* Search Bar */}
      <section className="py-4 bg-light">
        <Container>
          <Form className="d-flex justify-content-center">
            <Form.Control type="text" placeholder="Search movies..." className="w-50 me-2" />
            <Button variant="primary">
              <FaSearch />
            </Button>
          </Form>
        </Container>
      </section>

      {/* Trending Malayalam Movies */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Trending Malayalam Movies</h2>
          <Row>
            {trendingMalayalamMovies.map((movie) => (
              <Col key={movie.id} md={3} sm={6} className="mb-4">
                <Card className="shadow h-100">
                  <Card.Img
                    variant="top"
                    src={movie.poster}
                    alt={movie.title}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{movie.title}</Card.Title>
                    <Card.Text className="text-warning">{movie.rating}</Card.Text>
                    <Card.Text className="flex-grow-1">{movie.description}</Card.Text>
                    <Button variant="primary" className="mt-auto">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
