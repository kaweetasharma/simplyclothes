import {
  FETCH_FAIL,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from '../OrderScreen/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
