const initialState = {
  user: {},
  error: null,
  message: null,
  authenticated : !!localStorage.getItem('user'),
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
        authenticated:true,
      };
    case "LOGIN_FAILURE":
      return { ...state, message: action.payload };
    case "USER_INFO_SUCCESS":
      return {
        ...state,
        user: action.payload.data.user,
        error: null,
      };
    case "USER_INFO_FAILURE":
      return { ...state, error: action.payload };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        message: action.payload.data.message,
        user: {},
        error: null,
        authenticated : false
      };
    case "LOGOUT_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default userReducer;
