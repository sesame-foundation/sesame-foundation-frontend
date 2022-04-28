import "./App.css";
import { FactoringChallenge } from "./components/FactoringChallenge.js";
import About from "./components/About.js";
import Terms from "./components/Terms.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Logo from "./logo.png";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  src={Logo}
                  alt="Sesame Foundation"
                  width="30px"
                  className="me-2"
                />
                Sesame Foundation
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav activeKey={window.location.pathname}>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/terms">
                  <Nav.Link>Terms</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Navigate replace to="/dfc" />} />
            <Route path="dfc" element={<FactoringChallenge />} />
            <Route path="about" element={<About />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
