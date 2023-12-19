import api from "../../api";

export const getAllApartments = (params) => async (dispatch) => {
  try {
    let url = `${params.page ? "page=" + params.page + "&" : ""}${
      params.number ? "number=" + params.number + "&" : ""
    }${params.status ? "status=" + params.status + "&" : ""}`;
    const response = await api.get("/apartment?" + url);
    dispatch({ type: "GET_ALL_APARTMENTS_SUCCESS", payload: response });
  } catch (error) {
    dispatch({ type: "GET_ALL_APARTMENTS_FAILURE", payload: error.message });
  }
};

export const createApartment = (apartmentData) => async (dispatch) => {
  console.log(apartmentData);
  try {
    const response = await api.post("/apartment", apartmentData);
    dispatch({ type: "CREATE_APARTMENT_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "CREATE_APARTMENT_FAILURE", payload: error.message });
  }
};

export const getOneApartment = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await api.get("/apartment/"+id, );
    dispatch({ type: "GET_ONE_APARTMENT_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ONE_APARTMENT_FAILURE", payload: error.message });
  }
};

export const clearMessage = () => {
  dispatch({ type: "CLEAR_MESSAGE" });
};
