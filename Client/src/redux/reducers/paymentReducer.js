const initialState = {
  payments: [],
  error: null,
  message: null,
};
const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PAYMENT_SUCCESS":
      return { ...state, payments: action.payload, error: null };
    case "GET_ALL_PAYMENT_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default paymentReducer;
