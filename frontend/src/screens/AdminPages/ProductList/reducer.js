import {
  CREATE_FAIL,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  FETCH_FAIL,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from '../../../utils/constants';

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
      };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_REQUEST:
      return { ...state, loadingCreate: true };
    case CREATE_SUCCESS:
      return { ...state, loadingCreate: false };
    case CREATE_FAIL:
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};
export default reducer;
