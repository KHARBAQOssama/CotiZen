import { combineReducers } from "redux";
import apartmentReducer from "./apartmentReducer";
import paymentReducer from "./apartmentReducer";

const rootReducer = combineReducers({
  apartments: apartmentReducer,
  payments: paymentReducer,
});

export default rootReducer;
