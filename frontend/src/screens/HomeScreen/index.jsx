import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../../components/Product/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './HomeScreen.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-screen">
      <Helmet>
        <title>VogueVibe - Home</title>
      </Helmet>
      <header className="home-header">
        <h1 className="home-title">Featured Products</h1>
        <p className="home-subtitle">
          Discover our range of exclusive and handpicked products just for you.
        </p>
      </header>
      <div className="products-container">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row className="products-row">
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
