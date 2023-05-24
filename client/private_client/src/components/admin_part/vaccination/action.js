import { createData, getData } from '../../../api/service';
import {
  loaderFalse,
  loaderTrue,
  setErrorMessage,
  setSuccessMessage,
} from '../../../action/index';

export const getVaccinationsList = () => async (dispatch) => {
  dispatch(loaderTrue());
  let { data } = await getData('/admin/vaccination');
  if (data.success === true) {
    dispatch(loaderFalse());
    dispatch({
      type: 'LIST_VACCINATIONS',
      payload: data.data,
    });
  }
};

// counts

export const getpatientscounts = () => async (dispatch) => {
  let { data } = await getData('/admin/patient');
  dispatch({
    type: 'LIST_PATIENTS',
    payload: data.data,
  });
};

export const issueVaccinationCertificate =
  (vaccinedata) => async (dispatch) => {
    let { data } = await createData(`/issue-vaccination`, { vaccinedata });
    if (data.success === true) {
      dispatch(setSuccessMessage(data?.data));
    } else {
      dispatch(setErrorMessage(data.message));
    }
  };
