const initialState = {
  apartments: "empty",
  message: null,
  apartment: null,
};
const apartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_APARTMENTS_SUCCESS":
      return {
        ...state,
        apartments: action.payload.data.apartments,
        message: null,
      };
    case "GET_ALL_APARTMENTS_FAILURE":
      return {
        ...state,
        message: { type: "error", content: action.payload.message },
      };
    case "CREATE_APARTMENT_SUCCESS":
      return { ...state, message: action.payload.message };
    case "CREATE_APARTMENT_FAILURE":
      return {
        ...state,
        message: { type: "error", content: action.payload.message },
      };
    case "GET_ONE_APARTMENT_SUCCESS":
      return {
        ...state,
        apartment: action.payload.apartment,
        message: action.payload.message || null,
      };
    case "GET_ONE_APARTMENT_FAILURE":
      return {
        ...state,
        message: { type: "error", content: action.payload.message },
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

export default apartmentReducer;
