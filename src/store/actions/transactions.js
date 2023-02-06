import { CREATE_TRANSACTION, DELETE_TRANSACTION, GET_ALL_TRANSACTION, UPDATE_TRANSACTION } from "../../apis/apiRoutes";
import {
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_SUCCESS,
} from "../constants/transaction";
import axios from '../../apis/axios'
export const createTransaction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TRANSACTION_REQUEST,
    });

    const data = await axios.post(CREATE_TRANSACTION, payload);
    console.log(data);

    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TRANSACTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateTransaction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TRANSACTION_REQUEST
    });

    const data = await axios.post(UPDATE_TRANSACTION, payload);
    console.log(data);

    dispatch({
      type: UPDATE_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TRANSACTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteTransaction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TRANSACTION_REQUEST,
    });
    console.log("payload of delete",payload)

    const data = await axios.post(DELETE_TRANSACTION, payload);
    console.log(data);

    dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRANSACTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getTransaction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRANSACTION_REQUEST,
    });

    const data = await axios.post(GET_ALL_TRANSACTION,payload);
    console.log(data);

    dispatch({
      type: GET_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TRANSACTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
