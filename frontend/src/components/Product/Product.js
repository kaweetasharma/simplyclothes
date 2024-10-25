import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from '../Rating';
import { Store } from '../../store';
import axios from 'axios';
import './Product.css';

const Product = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Product Not available');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return (
    <Card className="product-card h-100 shadow-sm">
      <Link to={`/product/${product.slug}`} className="card-link">
        <div className="image-container">
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.slug}`} className="product-title-link">
          <Card.Title className="product-title">{product.name}</Card.Title>
        </Link>
        <div className="product-rating">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
        <Card.Text className="product-price">
          £{product.price.toFixed(2)}
        </Card.Text>
        <Button
          onClick={() => addToCartHandler(product)}
          disabled={!product.countInStock}
          variant={!product.countInStock ? 'outline-secondary' : 'primary'}
          className="mt-auto add-to-cart-btn"
        >
          {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
