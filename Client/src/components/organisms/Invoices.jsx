import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices, getInvoice } from "../../redux/actions/invoiceActions";
import UpdateModal from "./updateModal";
import InvoicePDF from "../pages/InvoicePDF";
import InvoiceModal from "./InvoiceModal";

const Invoices = () => {
  const [toPrint, setToPrint] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [toEdit, setToEdit] = useState(null);
  const invoices = useSelector((state) => state.invoices.invoices);
  const error = useSelector((state) => state.invoices.error);

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  useEffect(() => {
    if (invoices != "empty") {
      setLoading(false);
    }
  }, [invoices]);
  useEffect(() => {
    if (toPrint) {
      dispatch(getInvoice(toPrint));
    }
  }, [toPrint]);
  return (
    <>
      <div className="flex-1 h-[100vh] overflow-y-scroll relative bg-gray-100 p-8">
        <h1 className="font-extrabold text-3xl ">Invoices</h1>
        <div className="mt-5 overflow-x-scroll w-full bg-white rounded-lg py-5">
          {loading && (
            <div className="text-center text-purple-400">Loading ...</div>
          )}
          {!loading && error && (
            <div className="text-center font-bold text-purple-400">{error}</div>
          )}
          {!loading && invoices != 0 && (
            <table className="w-max min-w-full">
              <thead className="w-max">
                <tr className="w-max relative">
                  <th className="text-start bg-white py-2 px-4 w-max sticky left-0">
                    APARTMENT CODE
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    INVOICE'S MONTH
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    AMOUNT
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    PAID AMOUNT
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    PAYMENTS
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    STATUS
                  </th>
                  <th className="text-start bg-white py-2 px-4 w-max">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="w-max relative">
                    <td className="w-max bg-white py-2 px-4 sticky left-0">
                      {invoice.apartment.number}
                    </td>
                    <td className="bg-white py-2 px-4 w-max">
                      {invoice.month}
                    </td>
                    <td className="bg-white py-2 px-4 w-max">{`${invoice.amount} $`}</td>
                    <td className="bg-white py-2 px-4 w-max">
                      {invoice.amount_paid}
                    </td>
                    <td className="bg-white py-2 px-4 w-max">
                      {invoice.payments.length}
                    </td>
                    <td className="bg-white py-2 px-4 w-max">
                      <span
                        className={`${
                          invoice.status == "paid"
                            ? "bg-green-300 text-green-600"
                            : invoice.status == "partially_paid"
                            ? "bg-yellow-300 text-yellow-600"
                            : invoice.status == "unpaid"
                            ? "bg-red-300 text-red-600"
                            : ""
                        } 

                        rounded-xl p-3 py-1
                        `}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="bg-white py-2 px-4 w-max flex gap-2">
                      <button
                        onClick={() => {
                          setToPrint(invoice._id);
                        }}
                        className="p-1 px-2 bg-blue-200 rounded-md text-blue-600"
                      >
                        <i className="uil uil-print"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* <div className="flex mt-4">
        <div>pagination</div>
        <button className="ms-auto p-2 bg-purple-500 text-white font-bold hover:px-4 transition-all rounded-md">
          download report
        </button>
      </div> */}
      </div>
      {toEdit && <UpdateModal open={toEdit} setOpen={setToEdit} id={toEdit} />}
      {toPrint && (
        <InvoiceModal
          open={toPrint}
          setOpen={setToPrint}
        />
      )}
    </>
  );
};

export default Invoices;
