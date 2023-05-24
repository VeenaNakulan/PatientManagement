import { createData, getData, updateData } from '../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../action';

export const getprofile = () => async (dispatch) => {
  const { data } = await getData('/profile');
  if (data?.success === true) {
    dispatch({
      type: 'SET_ROLE',
      payload: data?.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getDisease = () => async (dispatch) => {
  const { data } = await getData('/profile/disease');
  if (data?.success === true) {
    dispatch({
      type: 'GET_DISEASE',
      payload: data?.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getProfileById = (id) => async (dispatch) => {
  const { data } = await getData(`/profile/${id}`);
  dispatch({
    type: 'GET_DATA_BY_ID',
    payload: data?.data,
  });
};

export const updateProfileData =
  (id, profiledata, navigate) => async (dispatch) => {
    const { data } = await updateData(`/profile/${id}`, profiledata);
    if (data.success === true) {
      dispatch(setSuccessMessage(data?.data));
      navigate('/dashboard');
    } else {
      dispatch(setErrorMessage(data?.message));
    }
  };
export const medicalCreate = (signup, navigate) => async (dispatch) => {
  const { data } = await createData('/profile/medical', signup);
  console.log('crdataeaemed', data);
  if (data.success === true) {
    dispatch(setSuccessMessage(data?.data));
    navigate('/dashboard');
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};

export const getMedical = () => async (dispatch) => {
  const { data } = await getData('/profile/medical/');
  if (data?.success === true) {
    dispatch({
      type: 'GET_MEDICAL',
      payload: data?.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getMedicalById = (id) => async (dispatch) => {
  const { data } = await getData(`/profile/medical/${id}`);
  dispatch({
    type: 'GET_MEDICAL_BY_ID',
    payload: data?.data,
  });
};

export const updateMedicalData =
  (id, medicaldata, navigate) => async (dispatch) => {
    const { data } = await updateData(`/profile/medical/${id}`, medicaldata);
    console.log('medicalupdate', data);
    if (data.success === true) {
      dispatch(setSuccessMessage(data?.data));
      navigate('/dashboard');
    } else {
      dispatch(setErrorMessage(data?.message));
    }
  };

export const getCertificate = () => async (dispatch) => {
  const { data } = await getData(`/profile/certificate`);
  dispatch({
    type: 'GET_CERTIFICATES',
    payload: data?.data,
  });
};
export const getCounts = () => async (dispatch) => {
  let { data } = await getData('/admin/counts');
  dispatch({
    type: 'COUNTS',
    payload: data.data,
  });
};
