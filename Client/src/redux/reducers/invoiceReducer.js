const initialState = {
  invoices: [],
  error: null,
  message: null,
};
const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_INVOICES_SUCCESS":
      return {
        ...state,
        invoices: action.payload.data.invoices,
        error: null,
      };
    case "GET_ALL_INVOICES_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default invoiceReducer;
