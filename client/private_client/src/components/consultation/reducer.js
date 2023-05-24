const initialState = {
  hospitaldata: [],
  eachData: [],
  timedata: [],
  consultationlist: [],
};
const hospitalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HOSPITAL_DATA':
      return {
        ...state,
        hospitaldata: action.payload,
      };
    case 'EACH_HOSPITAL_DATA':
      return {
        ...state,
        eachData: action.payload,
      };
    case 'EACH_DEPARTMENT_DATA':
      return {
        ...state,
        eachData: action.payload,
      };
    case 'GET_TIME':
      return {
        ...state,
        timedata: action.payload,
      };
    case 'GET_CONSULTATION':
      return {
        ...state,
        consultationlist: action.payload,
      };

    default:
      return state;
  }
};

export default hospitalReducer;
