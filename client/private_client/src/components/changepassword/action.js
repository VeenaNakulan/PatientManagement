import { setErrorMessage, setSuccessMessage } from '../../action';
import { createData } from '../../api/service';

export const changePassword =
  (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      let { data } = await createData('/changepassword', {
        newPassword,
        confirmPassword,
        currentPassword,
      });
      console.log('change-data', data);
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
