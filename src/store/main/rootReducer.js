import { combineReducers } from '@reduxjs/toolkit';
import { userLoginReducer,userRegisterReducer } from '../reducers/auth';
import { createTransactionReducer, deleteTransactionReducer, getTransactionReducer, updateTransactionReducer } from '../reducers/transaction';
import { getUserDataReducer, updateBalanceDataReducer } from '../reducers/user';
// import user from './userSlice';

const rootReducer = combineReducers({
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userTransaction:createTransactionReducer,
  updateTransaction:updateTransactionReducer,
  deleteTransaction:deleteTransactionReducer,
  getTransacion:getTransactionReducer,
  userDataReducer:getUserDataReducer,
  updateBalanceDataReducer:updateBalanceDataReducer
});

export default rootReducer;