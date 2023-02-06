import { GET_USER_DATA, UPDATE_BALANCE_DATA } from "../../apis/apiRoutes";
import {
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  EDIT_BALANCE_REQUEST,
  EDIT_BALANCE_FAIL,
  EDIT_BALANCE_SUCCESS,
} from "../constants/user";
import axios from "../../apis/axios";

export const editBalance = (payload) => async (dispatch) => {
  try {
    console.log("payload from action",payload)
    dispatch({
      type: EDIT_BALANCE_REQUEST,
    });

    const data = await axios.post(UPDATE_BALANCE_DATA,payload);
    console.log(data);

    dispatch({
      type: EDIT_BALANCE_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: EDIT_BALANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    
  }
};
export const getUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });

    const data = await axios.get(GET_USER_DATA);
    console.log(data);

    dispatch({
      type: GET_USER_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_DATA_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
