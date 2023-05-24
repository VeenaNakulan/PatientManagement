import { deleteDatas, getData, updateData } from '../../../api/service';
import {
  loaderFalse,
  loaderTrue,
  setErrorMessage,
  setSuccessMessage,
} from '../../../action/index';

export const getMessages = () => async (dispatch) => {
  dispatch(loaderTrue());
  let { data } = await getData('/admin/enquiry');
  if (data.success === true) {
    dispatch(loaderFalse());
    dispatch({
      type: 'GET_ALL_ENQURIES',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const PutMessages = (id) => async (dispatch) => {
  let { data } = await updateData(`/admin/enquiry/${id}`);
  if (data.success === true) {
    dispatch(setSuccessMessage(data?.data));
    dispatch(getMessages());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const DeleteMessages = (id) => async (dispatch) => {
  let { data } = await deleteDatas(`/admin/enquiry/${id}`);
  console.log(data);
  if (data.success === true) {
    dispatch(setSuccessMessage(data?.data));
    dispatch(getMessages());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
