const initialState = {
  invoices: [],
  error: null,
  message: null,
  invoiceToPrint: null,
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
    case "INVOICE_TO_PRINT_SUCCESS":
      return { ...state,invoiceToPrint : action.payload.invoice };
    case "INVOICE_TO_PRINT_FAILURE":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
export default invoiceReducer;
