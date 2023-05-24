const initailState = {
  isLogin: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  role: localStorage.getItem('role') ? localStorage.getItem('role') : null,
};

const loginReducer = (state = initailState, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return {
        ...state,
        isLogin: localStorage.getItem('token')
          ? localStorage.getItem('token')
          : null,
        role: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogin: null,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
