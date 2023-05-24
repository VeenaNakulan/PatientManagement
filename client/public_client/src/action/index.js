import { createData } from '../api/service';

export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

export const loaderTrue = () => (dispatch) => {
  dispatch({
    type: 'LOADER_TRUE',
  });
};

export const loaderFalse = () => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'LOADER_FALSE',
    });
  }, 1500);
};

export const createEnquiry = (contactData) => async (dispatch) => {
  console.log(contactData);
  const { data } = await createData('/enquiry', contactData);
  if (data.success === true) {
    dispatch(setSuccessMessage(data?.data));
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};
