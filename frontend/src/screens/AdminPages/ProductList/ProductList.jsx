import React, { useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { Store } from '../../../store';
import {
  CREATE_FAIL,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  FETCH_FAIL,
  FETCH_SUCCESS,
} from '../../../utils/constants';
import { getError } from '../../../utils/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loadingbox from '../../../components/LoadingBox';
import MessageBox from '../../../components/MessageBox';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [{ loading, error, products, pages, loadingCreate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: FETCH_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: FETCH_FAIL, payload: getError(error) });
      }
    };
    fetchData();
  }, [page, userInfo]);

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: CREATE_REQUEST });
        const { data } = await axios.post(
          '/api/products',
          {},
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        toast.success('product created successfully');
        dispatch({ type: CREATE_SUCCESS });
        navigate(`/admin/product/${data.product._id}`);
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: CREATE_FAIL,
        });
      }
    }
  };
  return (
    <div>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              Create Product
            </Button>
          </div>
        </Col>
      </Row>
      {loadingCreate && <Loadingbox />}
      {loading ? (
        <Loadingbox></Loadingbox>
      ) : error ? (
        <MessageBox variant={'danger'}>{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                {/* <th>ACTIONS</th> */}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                className={Number(page) === x + 1 ? 'btn text-bold' : 'btn'}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
