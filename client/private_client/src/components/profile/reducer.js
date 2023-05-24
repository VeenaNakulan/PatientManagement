const initailState = {
  profiledetails: [],
  diseases: [],
  updateProfile: [],
  medicalDataByid: [],
  medicalData: [],
  certificatelist: [],
  pcounts: [],
};

const profileReducer = (state = initailState, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return {
        ...state,
        profiledetails: action.payload,
      };
    case 'GET_DISEASE':
      return {
        ...state,
        diseases: action.payload,
      };
    case 'GET_DATA_BY_ID':
      return {
        ...state,
        updateProfile: action.payload,
      };
    case 'GET_MEDICAL':
      return {
        ...state,
        medicalData: action.payload,
      };
    case 'GET_MEDICAL_BY_ID':
      return {
        ...state,
        medicalDataByid: action.payload,
      };
    case 'GET_CERTIFICATES':
      return {
        ...state,
        certificatelist: action.payload,
      };
    case 'COUNTS':
      return {
        ...state,
        pcounts: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
