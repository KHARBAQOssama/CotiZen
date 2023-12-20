import { useEffect, useState } from "react";
import utils from "../../utils";
import PaymentPDF from "../pages/PaymentPDF";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPayments, getPayment,
} from "../../redux/actions/paymentsActions";
import AddPaymentModal from "./AddPaymentModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PaymentModal from "./PaymentModal";

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [toPrint, setToPrint] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const payments = useSelector((state) => state.payments.payments);
  const error = useSelector((state) => state.apartments.error);

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  useEffect(() => {
    if (payments != "empty") {
      console.log(payments);
      setLoading(false);
    }
  }, [payments]);

  useEffect(() => {
    if(toPrint){
      dispatch(getPayment(toPrint))
    }
  }, [toPrint]);
  return (
    <>
      <div className="flex-1 h-[100vh] overflow-y-scroll relative bg-gray-100 p-8">
        <div className="flex mt-5">
          <h1 className="font-extrabold text-3xl">Payments</h1>
          <button
            className="px-3 py-2 rounded-xl ms-auto bg-purple-600 text-white font-bold"
            onClick={() => setOpenPaymentModal(true)}
          >
            Add Payment
          </button>
        </div>
        <div className="mt-5 overflow-x-scroll w-full bg-white rounded-lg py-5">
          {loading && (
            <div className="text-center text-purple-400">Loading ...</div>
          )}
          {!loading && error && (
            <div className="text-center font-bold text-purple-400">{error}</div>
          )}
          {!loading && payments.length != 0 && (
            <table className="w-max min-w-full">
              <thead className="w-max">
                <tr className="w-max relative">
                  <th className="text-start bg-white py-2 px-4 w-max sticky left-0">
                    APARTMENT CODE
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    PAYMENT DATE
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    PAYMENT AMOUNT
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    INVOICE STATUS
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    INVOICE AMOUNT
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="w-max relative">
                    <td className="w-max bg-white py-2 px-4 sticky left-0">
                      {payment.invoice.apartment.number}
                    </td>
                    <td className="bg-white py-2 px-4 w-max">
                      {utils.formatDate(payment.date)}
                    </td>
                    <td className="bg-white py-2 px-4 w-max">{`${payment.amount} $`}</td>
                    <td className="bg-white py-2 px-4 w-max">
                      <span
                        className={`${
                          payment.invoice.status == "paid"
                            ? "bg-green-300 text-green-600"
                            : payment.invoice.status == "partially_paid"
                            ? "bg-yellow-300 text-yellow-600"
                            : payment.invoice.status == "unpaid"
                            ? "bg-red-300 text-red-600"
                            : ""
                        } 

                        rounded-xl p-3 py-1
                        `}
                      >
                        {payment.invoice.status}
                      </span>
                    </td>
                    <td className="bg-white py-2 px-4 w-max">
                      {payment.invoice.amount}
                    </td>
                    <td className="bg-white py-2 px-4 w-max flex gap-2">
                      <button
                        onClick={() => handleDownload(payment._id)}
                        className="p-1 px-2 bg-blue-200 rounded-md text-blue-600"
                      >
                        <i className="uil uil-print"></i>
                      </button>
                      {/* <PDFDownloadLink document={<PaymentPDF id={payment._id}/>} fileName="payment.pdf">
                        {({ blob, url, loading, error }) =>
                          loading ? (
                            "Loading document..."
                          ) : ( */}
                            <button
                              onClick={()=>{setToPrint(payment._id)}}
                              className="p-1 px-2 bg-blue-200 rounded-md text-blue-600"
                            >
                              <i className="uil uil-print"></i>
                            </button>
                          {/* )
                        }
                      </PDFDownloadLink> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {openPaymentModal && (
        <AddPaymentModal
          open={openPaymentModal}
          setOpen={setOpenPaymentModal}
        />
      )}
      {toPrint && (
        <PaymentModal
          open={toPrint}
          setOpen={setToPrint}
        />
      )}
    </>
  );
};

export default Payments;
