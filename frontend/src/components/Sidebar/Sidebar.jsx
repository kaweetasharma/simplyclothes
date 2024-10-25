import { Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faUserShield,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarIsOpen, setSidebarIsOpen, categories }) => {
  const {
    state: { userInfo, cart },
    dispatch: ctxDispatch,
  } = useContext(Store);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    setSidebarIsOpen(false);
  };

  return (
    <div
      className={
        sidebarIsOpen
          ? 'side-navbar active-nav d-flex flex-column'
          : 'side-navbar d-flex flex-column'
      }
    >
      <div className="sidebar-header d-flex align-items-center justify-content-between">
        <h5 className="text-light">Welcome, {userInfo?.name || 'Guest'}</h5>
        <span
          className="close-sidebar-icon"
          onClick={() => setSidebarIsOpen(false)}
        >
          &#x2715; {/* Unicode character for a close icon */}
        </span>
      </div>
      <div className="sidebar-content scrollable-content">
        {/* Pages Section */}
        <Nav className="flex-column text-white mb-3">
          <Nav.Item className="section-title">
            <strong>Pages</strong>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <LinkContainer to="/" onClick={() => setSidebarIsOpen(false)}>
              <Nav.Link>
                <FontAwesomeIcon icon={faHome} className="me-2" /> Home
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <LinkContainer to="/cart" onClick={() => setSidebarIsOpen(false)}>
              <Nav.Link>
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                <span style={{ position: 'relative' }}>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </span>
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
          {userInfo && (
            <>
              <Nav.Item className="nav-item">
                <LinkContainer
                  to="/profile"
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUser} className="me-2" /> User
                    Profile
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <LinkContainer
                  to="/orderhistory"
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUserShield} className="me-2" />
                    Order History
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link
                  to="#signout"
                  className="nav-link"
                  onClick={signoutHandler}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Sign Out
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>

        {/* Categories Section */}
        <Nav className="flex-column text-white mb-3">
          <Nav.Item className="section-title">
            <strong>Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category} className="nav-item">
              <LinkContainer
                to={`/search?category=${category}`}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>
                  <FontAwesomeIcon icon={faList} className="me-2" />
                  {category}
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
        </Nav>

        {/* Admin Section (only if user is admin) */}
        {userInfo && userInfo.isAdmin && (
          <Nav className="flex-column text-white">
            <Nav.Item className="section-title">
              <strong>Admin</strong>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <LinkContainer
                to="/admin/dashboard"
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <LinkContainer
                to="/admin/products"
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <LinkContainer
                to="/admin/orders"
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <LinkContainer
                to="/admin/users"
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
