import api from "../../api";

export const getAllInvoices = () => async (dispatch) => {
  try {
    const response = await api.get("/invoice");
    dispatch({ type: "GET_ALL_INVOICES_SUCCESS", payload: response });
  } catch (error) {
    dispatch({ type: "GET_ALL_INVOICES_FAILURE", payload: error.message });
  }
};

