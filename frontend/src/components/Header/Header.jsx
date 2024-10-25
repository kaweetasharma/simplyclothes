import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navbar, Container, Button, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from '../../store';
import SearchBox from '../SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ setSidebarIsOpen, sidebarIsOpen, categories }) => {
  const {
    state: { cart, userInfo },
    dispatch: ctxDispatch,
  } = useContext(Store);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
  };

  return (
    <header>
      {/* Main Navigation Bar */}
      <Navbar className="modern-navbar" variant="dark" expand="lg">
        <Container fluid>
          {/* Sidebar toggle button visible only on small screens */}
          <Button
            variant="outline-light"
            className="sidebar-toggle-btn d-lg-none"
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <LinkContainer to="/">
            <Navbar.Brand className="brand-logo">VogueVibe</Navbar.Brand>
          </LinkContainer>
          {/* <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="d-none d-lg-block"
          /> */}
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-block">
            <SearchBox />
            <Nav className="ms-auto d-flex align-items-center">
              <Link to="/cart" className="nav-link cart-link">
                <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown
                  title={
                    <>
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      {userInfo.name}
                    </>
                  }
                  id="user-nav-dropdown"
                  className="user-nav-dropdown"
                  align="end"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      User Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>
                      <FontAwesomeIcon icon={faUserShield} className="me-2" />
                      Order History
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link sign-in-link" to="/signin">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  Sign In
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <>
                      <FontAwesomeIcon icon={faUserShield} className="me-1" />
                      Admin
                    </>
                  }
                  id="admin-nav-dropdown"
                  align="end"
                >
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Category Navigation Bar for Large Screens */}
      <Navbar className="category-navbar d-none d-lg-block" variant="dark">
        <Container fluid>
          <Nav className="me-auto">
            {categories.map((category) => (
              <LinkContainer key={category} to={`/search?category=${category}`}>
                <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
