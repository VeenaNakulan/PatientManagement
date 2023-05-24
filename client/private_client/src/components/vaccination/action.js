import { createData, getData } from '../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../action/index';

export const getVaccineList = () => async (dispatch) => {
  try {
    let { data } = await getData('/vaccination/vaccine');
    dispatch({
      type: 'LIST_VACCINE',
      payload: data.data,
    });
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  }
};
export const postVaccine =
  (bookingData, transactionData) => async (dispatch) => {
    try {
      let { data } = await createData('/vaccination', {
        bookingData,
        transactionData,
      });
      if (data.success === true) {
        dispatch(setSuccessMessage(data?.data));
      } else {
        dispatch(setErrorMessage(data?.message));
      }
    } catch (error) {
      dispatch(setErrorMessage(error));
    }
  };
export const getEachVaccineData = () => async (dispatch) => {
  try {
    let { data } = await getData('/vaccination');
    dispatch({
      type: 'GET_EACH_VACCINE',
      payload: data.data,
    });
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  }
};
