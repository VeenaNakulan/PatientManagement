import { getData } from '../../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../../action/index';

export const getTransactions = () => async (dispatch) => {
  let { data } = await getData('/admin/transactions');
  if (data.success === true) {
    dispatch({
      type: 'GET_ALL_TRANSACTIONS',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
