import { useRouter } from 'next/router';
import { Container, Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store'; 
import Link from 'next/link';

const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const queryString = `title=true&q=${searchField}`;

    setSearchHistory((current) => [...current, queryString]);

    router.push(`/artwork?${queryString}`);
    setIsExpanded(false); 
  };

  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-dark"
        expand="lg"
        expanded={isExpanded} 
      >
        <Container>
          <Navbar.Brand>Ulas Cagin Ondev</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded((prev) => !prev)} 
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                onClick={() => setIsExpanded(false)} 
                active={router.pathname === '/'}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/search"
                onClick={() => setIsExpanded(false)} 
                active={router.pathname === '/search'}
              >
                Advanced Search
              </Nav.Link>
            </Nav>

            <Nav>
              <NavDropdown
                title="User Name"
                id="basic-nav-dropdown"
                align="end"
              >
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === '/favourites'}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === '/history'}
                  >
                    History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>

            <Form className="d-flex" onSubmit={handleSubmit}>
              &nbsp; {}
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="primary" type="submit">Search</Button>
              &nbsp; {}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
    </>
  );
};

export default MainNav;
