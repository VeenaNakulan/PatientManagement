import { createData, getData } from '../../../api/service';
import {
  loaderFalse,
  loaderTrue,
  setErrorMessage,
  setSuccessMessage,
} from '../../../action/index';

export const getConsultResult = () => async (dispatch) => {
  dispatch(loaderTrue());
  let { data } = await getData('/admin/consultation');
  if (data.success === true) {
    dispatch(loaderFalse());
    dispatch({
      type: 'LIST_CONSULT',
      payload: data.data,
    });
  }
};

export const geteachUser = () => async (dispatch) => {
  let { data } = await getData('/userdata');
  dispatch({
    type: 'LIST_EACH_USER',
    payload: data.data,
  });
};

export const CertificateCreation = (certdata) => async (dispatch) => {
  let { data } = await createData(`/issue-consultation`, { certdata });
  if (data.success === true) {
    dispatch(setSuccessMessage(data.data));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
