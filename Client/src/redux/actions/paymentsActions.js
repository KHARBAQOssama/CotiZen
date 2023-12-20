import api from "../../api";

export const getAllPayments = () => async (dispatch) => {
  try {
    const response = await api.get("/payment");
    dispatch({ type: "GET_ALL_PAYMENTS_SUCCESS", payload: response });
  } catch (error) {
    dispatch({ type: "GET_ALL_PAYMENTS_FAILURE", payload: error.message });
  }
};

export const createPayment = (paymentData) => async (dispatch) => {
  console.log(paymentData);
  try {
    const response = await api.post("/payment", paymentData);
    console.log(response , 'res');
    dispatch({ type: "CREATE_PAYMENT_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error.response,'er');
    dispatch({ type: "CREATE_PAYMENT_FAILURE", payload: error.response.data.message });
  }
};
export const getPayment = (id) => async (dispatch) => {
  try {
    const response = await api.get("/payment/"+id);
    console.log(response , 'res');
    dispatch({ type: "PAYMENT_TO_PRINT_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error.response,'er');
    dispatch({ type: "PAYMENT_TO_PRINT_FAILURE", payload: error.response.data });
  }
};

export const clearMessage = () => async (dispatch) => {
  console.log("object");
  dispatch({ type: "CLEAR_MESSAGE" });
};
