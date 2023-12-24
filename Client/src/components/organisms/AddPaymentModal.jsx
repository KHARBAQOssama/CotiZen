import { useEffect, useState } from "react";
import utils from "../../utils";
import { getAllApartmentsWithInvoices } from "../../redux/actions/apartmentActions";
import {
  clearMessage,
  createPayment,
  getAllPayments
} from "../../redux/actions/paymentsActions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPaymentModal = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apartments = useSelector(
    (state) => state.apartments.apartmentsInvoices
  );
  const message = useSelector((state) => state.payments.message);
  const [error, setError] = useState("");
  const [apartment, setApartment] = useState({ _id: "" });
  const [invoice, setInvoice] = useState({ _id: "" });
  const [payment, setPayment] = useState({
    invoiceId: null,
    amount: null,
  });
  const handleChange = (e) => {
    if (e.target.name == "amount") {
      setPayment({ ...payment, amount: parseFloat(e.target.value) });
    }else if (e.target.name == "apartment") {
      let apartment2 = apartments.filter(
        (apartment) => apartment._id == e.target.value
      );
      setApartment(apartment2[0]);
    } else if (e.target.name == "invoiceId") {
      setPayment({ ...payment, invoiceId: e.target.value });
      let invoice2 = apartment.invoices.filter(
        (invoice) => invoice._id == e.target.value
      );
      setInvoice(invoice2[0]);
    }
  };
  useEffect(() => {
    dispatch(getAllApartmentsWithInvoices());
  }, [dispatch]);
  const handleSubmit = () => {
    let errors = utils.paymentValidation(payment);
    if (errors.length) {
      setError(errors[0]);
      return;
    } else {
      setError("");
    }
    dispatch(createPayment(payment));
  };
  const setRest = () =>{
    setPayment({...payment , amount : invoice.amount - invoice.amount_paid})
  }
  const closeForm = () => {
    setOpen(!open);
    setPayment({
      invoiceId: null,
      amount: null,
    });
    dispatch(clearMessage());
    dispatch(getAllPayments())
    navigate("/admin/payments");
  };
  useEffect(() => {
    if (message && message.type == 'error') {
      setError(message.content)
      dispatch(clearMessage())
    }
  }, [message]);
  return (
    <>
      {open && (
        <div className="z-50 w-[100%] h-[100vh] flex absolute top-0 left-0 bg-opacity-20 bg-black">
          <form
            action=""
            className="flex-col flex gap-5 m-auto relative rounded-tr-md bg-white p-5 px-8 rounded-2xl w-[30%] min-w-[300px]"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {(!message || !message.content) && (
              <>
                <h1 className="text-3xl py-2">Add Payment</h1>
                <button
                  onClick={() => setOpen(!open)}
                  className="absolute right-8 text-xl top-8 text-gray-300 hover:text-black"
                >
                  <i className="uil uil-times"></i>
                </button>
                <div className="w-full gap-5 flex flex-col">
                  {error && (
                    <div className="w-full rounded-md text-start bg-red-200 px-3 py-2 flex justify-between">
                      <h3 className=" text-red-600 font-semibold ">{error}</h3>
                      <button
                        className="text-red-600"
                        onClick={() => setError("")}
                      >
                        <i className="uil uil-times"></i>
                      </button>
                    </div>
                  )}
                  <select
                    name="apartment"
                    value={apartment?._id}
                    onChange={handleChange}
                    className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
                    id=""
                  >
                    <option className="max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap" value="">Apartments</option>
                    {apartments.length != 0 &&
                      apartments.map((apartment) => (
                        <option className="max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap" key={apartment._id} value={apartment._id}>
                          {apartment.number} - {apartment.address}
                        </option>
                      ))}
                  </select>
                  {apartment &&
                    apartment.invoices &&
                    ((apartment.invoices.length != 0 && (
                      <select
                        value={payment.invoiceId}
                        onChange={handleChange}
                        name="invoiceId"
                        className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
                      >
                        <option className="max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap" value="">Invoices Months</option>
                        {apartment.invoices.length != 0 &&
                          apartment.invoices.map((invoice) => (
                            <option className="max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap" key={invoice._id} value={invoice._id}>
                              {invoice.month}
                            </option>
                          ))}
                      </select>
                    )) || (
                      <div className="text-center py-2 px-3 rounded-xl bg-blue-200 text-blue-600">
                        This Apartment Has No Invoices Till Now
                      </div>
                    ))}
                  {invoice?._id &&
                    ((invoice.status != "paid" && (
                      <div className="flex gap-2">
                      <input
                        type="number"
                        name="amount"
                        className="bg-gray-100 p-2 py-3 flex-1 rounded-md font-light"
                        onChange={handleChange}
                        value={payment.amount}
                        placeholder="The Payment Amount"
                      />
                      <button className="p-3 rounded-lg bg-purple-600 text-white" onClick={setRest}>Rest</button></div>
                    )) || (
                      <div className="text-center py-2 px-3 rounded-xl bg-blue-200 text-blue-600">
                        This Invoice Already Paid
                      </div>
                    ))}
                </div>

                <button onClick={handleSubmit} className=" bg-purple-600 text-white ms-auto px-5 p-1 border-2 border-purple-600 rounded-md hover:bg-purple-700">
                  Submit
                </button>
              </>
            )}
            {message && message.content && (
              <div className="flex flex-col gap-5">
                <h3 className="text-center text-xl font-bold text-green-500">
                  {message.content}
                </h3>
                <button
                  onClick={() => {
                    closeForm();
                  }}
                  className="bg-green-500 text-white w-max py-2 px-12 m-auto rounded-md"
                >
                  close
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default AddPaymentModal;
