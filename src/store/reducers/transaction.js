import {
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  GET_ALL_TRANSACTION_FAILURE,
  GET_ALL_TRANSACTION_REQUEST,GET_ALL_TRANSACTION_SUCCESS
} from "../constants/transaction";

export const createTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION_REQUEST:
      return { loading: true };
    case CREATE_TRANSACTION_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case CREATE_TRANSACTION_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TRANSACTION_REQUEST:
      return { loading: true };
    case GET_TRANSACTION_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case GET_TRANSACTION_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRANSACTION_REQUEST:
      return { loading: true };
    case DELETE_TRANSACTION_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case DELETE_TRANSACTION_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TRANSACTION_REQUEST:
      return { loading: true };
    case UPDATE_TRANSACTION_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case UPDATE_TRANSACTION_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
