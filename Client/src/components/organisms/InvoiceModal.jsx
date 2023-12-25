import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentPDF from "../pages/PaymentPDF";
import InvoicePDF from "../pages/InvoicePDF";

const InvoiceModal = ({ open, setOpen }) => {
  const invoice = useSelector((state) => state.invoices.invoiceToPrint);
  console.log(invoice,'from modal');
  return (
    <>
      {open && (
        <div className="z-50 w-[100%] h-[100vh] flex absolute top-0 left-0 bg-opacity-20 bg-black">
          <div className="w-full max-w-[500px] h-max m-auto rounded-2xl p-8 pt-16 relative bg-white">
            <button
              onClick={() => setOpen(!open)}
              className="absolute right-8 text-xl top-5 text-gray-300 hover:text-black"
            >
              <i className="uil uil-times"></i>
            </button>
            {invoice && (
              <div>
                <InvoicePDF invoice={invoice} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceModal;
