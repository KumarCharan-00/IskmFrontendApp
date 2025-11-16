import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import '../../assets/css/navigation.css';

function Navigation() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(expanded => !expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <Navbar expanded={expanded} expand="lg" className="navigation">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          ISKM Proddatur
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link" onClick={handleClose}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link" onClick={handleClose}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/books" className="nav-link" onClick={handleClose}>
              Books
            </Nav.Link>
            <Nav.Link as={Link} to="/prasadam" className="nav-link" onClick={handleClose}>
              Prasadam
            </Nav.Link>
            <Nav.Link as={Link} to="/sankirtan" className="nav-link" onClick={handleClose}>
              Sankirtan
            </Nav.Link>
            <Nav.Link as={Link} to="/classes" className="nav-link" onClick={handleClose}>
              Bhakti Classes
            </Nav.Link>
            <Nav.Link as={Link} to="/festivals" className="nav-link" onClick={handleClose}>
              Festivals
            </Nav.Link>
            <Nav.Link as={Link} to="/youth" className="nav-link" onClick={handleClose}>
              Youth Programs
            </Nav.Link>
            <Nav.Link as={Link} to="/sunday-feast" className="nav-link" onClick={handleClose}>
              Sunday Feast
            </Nav.Link>
            <Nav.Link as={Link} to="/donate" className="nav-link">
              <i className="fas fa-heart me-2"></i>Donate
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;