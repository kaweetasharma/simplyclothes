import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import MessageBox from '../../components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './CartScreen.css';
import Image from 'react-bootstrap/Image';

const Cartscreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const deleteCartItemHandler = (item) => {
    ctxDispatch({
      type: 'CART_DELETE_ITEM',
      payload: item,
    });
  };

  return (
    <div className="cart-screen">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Row>
        <Col md={8}>
          <h1 className="cart-title">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <MessageBox>
              Your cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="cart-item">
                  <Row className="align-items-center">
                    <Col md={3}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        className="cart-item-image"
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.slug}`} className="item-link">
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span className="item-quantity">{item.quantity}</span>{' '}
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={2} className="item-price">
                      £{item.price.toFixed(2)}
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteCartItemHandler(item)}
                        className="remove-item-btn"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="cart-summary">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="cart-summary-item">
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items): £
                    {cartItems
                      .reduce((a, c) => a + c.quantity * c.price, 0)
                      .toFixed(2)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      className="checkout-btn"
                      disabled={cartItems.length === 0}
                      onClick={() => navigate('/signin?redirect=/shipping')}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cartscreen;
