import api from "../../api";

export const login = (user) => async (dispatch) => {
  try {
    const response = await api.post("/auth/login",user);
    dispatch({ type: "LOGIN_SUCCESS", payload: response });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

export const me = () => async (dispatch) => {
  try {
    const response = await api.get("/auth/me");
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({ type: "USER_INFO_SUCCESS", payload: response });
  } catch (error) {
    dispatch({ type: "USER_INFO_FAILURE", payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await api.get("/auth/logout");
    localStorage.removeItem('user')
    dispatch({ type: "LOGOUT_SUCCESS", payload: response });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAILURE", payload: error.response.data.message });
  }
};

export const clearMessage = () => async (dispatch) => {
  dispatch({ type: "CLEAR_MESSAGE" });
};
