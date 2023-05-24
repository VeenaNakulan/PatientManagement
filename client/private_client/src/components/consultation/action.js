import { createData, getData } from '../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../action/index';

export const getHospitaldetails = () => async (dispatch) => {
  let { data } = await getData('/hospital');
  dispatch({
    type: 'HOSPITAL_DATA',
    payload: data.data,
  });
};

export const corespondingHospitalData = (hospital) => async (dispatch) => {
  let { data } = await createData('/hospital', { hospital });
  dispatch({
    type: 'EACH_HOSPITAL_DATA',
    payload: data.data,
  });
};

export const corespondingDepartmentData =
  (hospital, department) => async (dispatch) => {
    let { data } = await createData('/hospital', { hospital, department });
    dispatch({
      type: 'EACH_HOSPITAL_DATA',
      payload: data.data,
    });
  };

export const getTimedata = (date) => async (dispatch) => {
  let { data } = await createData('/hospital/time', date);
  dispatch({
    type: 'GET_TIME',
    payload: data.data,
  });
};

export const postConsultation =
  (bookingData, transactionData) => async (dispatch) => {
    console.log(bookingData);
    try {
      let { data } = await createData('consultation', {
        bookingData,
        transactionData,
      });
      if (data.success === true) {
        dispatch(setSuccessMessage(data?.data));
        // navigate('/dashboard');
      } else {
        dispatch(setErrorMessage(data?.message));
      }
    } catch (error) {
      dispatch(setErrorMessage(error));
    }
  };

export const getConsultaion = () => async (dispatch) => {
  try {
    let { data } = await getData('/consultation');
    dispatch({
      type: 'GET_CONSULTATION',
      payload: data.data,
    });
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  }
};
