const initialState = {
  payments: [],
  error: null,
  message: null,
  paymentToPrint : null
};
const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PAYMENTS_SUCCESS":
      return {
        ...state,
        payments: action.payload.data.payments,
        error: null,
      };
    case "GET_ALL_PAYMENTS_FAILURE":
      return { ...state, error: action.payload };
    case "CREATE_PAYMENT_SUCCESS":
      return { ...state, message: action.payload.message };
    case "CREATE_PAYMENT_FAILURE":
      return {
        ...state,
        message: action.payload,
      };
    case "PAYMENT_TO_PRINT_SUCCESS":
      return { ...state, paymentToPrint: action.payload.payment };
    case "PAYMENT_TO_PRINT_FAILURE":
      return {
        ...state,
        message: action.payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
export default paymentReducer;
