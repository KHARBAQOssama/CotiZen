import { combineReducers } from "redux";
import apartmentReducer from "./apartmentReducer";
import paymentReducer from "./paymentReducer";
import invoiceReducer from "./invoiceReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  apartments: apartmentReducer,
  payments: paymentReducer,
  users: userReducer,
  invoices: invoiceReducer,
});

export default rootReducer;