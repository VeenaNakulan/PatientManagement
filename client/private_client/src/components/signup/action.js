import { setErrorMessage, setSuccessMessage } from '../../action';
import { getData, createData, updateData, deleteData } from '../../api/service';

export const loginDetails = (logindata, navigate) => async (dispatch) => {
  const { data } = await createData('/auth/login', logindata);
  if (data.success === true) {
    localStorage.setItem('token', data.data?.accessToken);
    localStorage.setItem('role', data.data?.role);
    dispatch({
      type: 'SET_ROLE',
      payload: data?.data,
    });
    dispatch(setSuccessMessage(data?.message));
    navigate('/dashboard');
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const signupDetails = (signup, navigate) => async (dispatch) => {
  const { data } = await createData('/auth/signup', signup);
  if (data.success === true) {
    dispatch(setSuccessMessage(data?.data));
    navigate('/login');
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  dispatch({
    type: 'LOGOUT',
    payload: null,
  });
  window.open('http://localhost:3000');
};
