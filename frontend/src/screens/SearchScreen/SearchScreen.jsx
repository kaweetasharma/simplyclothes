import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../../utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Col, Row, Form, Card } from 'react-bootstrap';
import Rating from '../../components/Rating';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Product from '../../components/Product/Product';
import { LinkContainer } from 'react-router-bootstrap';
import {
  FETCH_FAIL,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from '../../utils/constants';
import './SearchScreen.css';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
      };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const prices = [
  { name: '£1 to £50', value: '1-50' },
  { name: '£51 to £200', value: '51-200' },
  { name: '£201 to £1000', value: '201-1000' },
];

export const ratings = [
  { name: '4 stars & up', rating: 4 },
  { name: '3 stars & up', rating: 3 },
  { name: '2 stars & up', rating: 2 },
  { name: '1 star & up', rating: 1 },
];

const SearchScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: FETCH_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: FETCH_FAIL, payload: getError(error) });
      }
    };
    fetchData();
  }, [category, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&page=${filterPage}&order=${sortOrder}`;
  };

  return (
    <div className="search-screen">
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <Card className="filter-card mb-4">
            <Card.Body>
              <h4 className="filter-title">Filters</h4>
              {/* Category Filter */}
              <div className="filter-section">
                <h5>Department</h5>
                <ul className="filter-list">
                  <li>
                    <Link
                      className={category === 'all' ? 'text-bold' : ''}
                      to={getFilterUrl({ category: 'all' })}
                    >
                      Any
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? 'text-bold' : ''}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Price Filter */}
              <div className="filter-section">
                <h5>Price</h5>
                <ul className="filter-list">
                  <li>
                    <Link
                      className={price === 'all' ? 'text-bold' : ''}
                      to={getFilterUrl({ price: 'all' })}
                    >
                      Any
                    </Link>
                  </li>
                  {prices.map((p) => (
                    <li key={p.value}>
                      <Link
                        className={p.value === price ? 'text-bold' : ''}
                        to={getFilterUrl({ price: p.value })}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Rating Filter */}
              <div className="filter-section">
                <h5>Avg. Customer Review</h5>
                <ul className="filter-list">
                  {ratings.map((r) => (
                    <li key={r.name}>
                      <Link
                        className={
                          `${r.rating}` === `${rating}` ? 'text-bold' : ''
                        }
                        to={getFilterUrl({ rating: r.rating })}
                      >
                        <Rating caption=" & up" rating={r.rating} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between align-items-center mb-4">
                <Col>
                  <div>
                    <strong>
                      {countProducts === 0 ? 'No' : countProducts} Results
                    </strong>
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : ' + price}
                    {rating !== 'all' && ' : ' + rating}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i> Clear Filters
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  <Form.Control
                    as="select"
                    value={order}
                    className="sort-select"
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </Form.Control>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-4" key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <div className="pagination">
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer key={x + 1} to={getFilterUrl({ page: x + 1 })}>
                    <Button
                      className={Number(page) === x + 1 ? 'active' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchScreen;
