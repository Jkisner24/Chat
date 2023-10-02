import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import style from './NavBar.module.css'

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-4">
      <Container >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className={style.titles} id="basic-navbar-nav">
          <Nav >
            <Nav.Link href="#home">Welcome to live Chat!</Nav.Link>
          </Nav>
          <Nav >
            <Nav.Link href="#home">About me</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;