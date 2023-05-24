const initialState = {
  listConsult: [],
  listVaccinations: [],
  enquries: [],
  counts: [],
  eachUser: [],
  transactions: [],
};
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_CONSULT':
      return {
        ...state,
        listConsult: action.payload,
      };
    case 'LIST_VACCINATIONS':
      return {
        ...state,
        listVaccinations: action.payload,
      };
    case 'GET_ALL_ENQURIES':
      return {
        ...state,
        enquries: action.payload,
      };
    case 'LIST_PATIENTS':
      return {
        ...state,
        counts: action.payload,
      };
    case 'LIST_EACH_USER':
      return {
        ...state,
        eachUser: action.payload,
      };
    case 'GET_ALL_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
