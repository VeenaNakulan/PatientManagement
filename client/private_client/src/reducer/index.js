import { combineReducers } from 'redux';
import loginReducer from '../components/signup/reducer';
import profileReducer from '../components/profile/reducer';
import hospitalReducer from '../components/consultation/reducer';
import vaccineReducer from '../components/vaccination/reducer';
import adminReducer from '../components/admin_part/reducer';

const initialStateCommon = {
  // successMessage: null,
  // errorMessage: null,
  loader: false,
};
const commonReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    case 'LOADER_TRUE':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_FALSE':
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  commonReducer,
  loginReducer,
  profileReducer,
  hospitalReducer,
  vaccineReducer,
  adminReducer,
});
