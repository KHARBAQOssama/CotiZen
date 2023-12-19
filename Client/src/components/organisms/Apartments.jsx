import { useEffect, useState } from "react";
import utils from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllApartments } from "../../redux/actions/apartmentActions";
import ApartmentStatus from "../molecules/ApartmentStatus";
import UpdateModal from "./updateModal";

const Apartments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [toEdit, setToEdit] = useState(null);
  const apartments = useSelector((state) => state.apartments.apartments);
  const error = useSelector((state) => state.apartments.error);
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(queryParams.get("page"));
  const [number, setNumber] = useState(queryParams.get("number"));
  const [status, setStatus] = useState(queryParams.get("status"));

  const handleChange = (e) => {
    if (e.target.name == "number") setNumber(e.target.value);
    else if (e.target.name == "status") setStatus(e.target.value);
  };
  useEffect(() => {
    dispatch(getAllApartments({ page, number, status }));
    console.log(page, number, status);
  }, [dispatch]);

  useEffect(() => {
    if (apartments != "empty") {
      setLoading(false);
    }
  }, [apartments]);
  return (
    <>
    <div className="flex-1 h-[100vh] overflow-y-scroll relative bg-gray-100 p-8">
      <h1 className="font-extrabold text-3xl ">Apartments</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5 bg-white p-2 shadow rounded-md">
        <div className="flex gap-3 items-center">
          <input
            value={number}
            onChange={(e) => handleChange(e)}
            name="number"
            className="bg-gray-100 p-2 flex-1 rounded-md"
            type="text"
            placeholder="Search by code"
          />
        </div>
        <div className="flex gap-3 items-center">
          <select
            onChange={(e) => handleChange(e)}
            name="status"
            value={status}
            id=""
            className="bg-gray-100 p-2 flex-1 rounded-lg"
          >
            <option value="">All</option>
            <option value="occupied">Occupied</option>
            <option value="available">Available</option>
            <option value="maintenance">In maintenance</option>
          </select>
          <button
            onClick={() =>
              navigate(
                `/admin/apartments?
                ${page ? "page=" + page + "&" : ""}
                ${number ? "number=" + number + "&" : ""}
                ${status ? "status=" + status + "&" : ""}`
              )
            }
            className=" bg-purple-500 text-white rounded-md p-2"
          >
            <i className="uil uil-filter"></i>
          </button>
        </div>
      </div>
      <div className="mt-5 overflow-x-scroll w-full bg-white rounded-lg py-5">
        {loading && (
          <div className="text-center text-purple-400">Loading ...</div>
        )}
        {!loading && error && (
          <div className="text-center font-bold text-purple-400">{error}</div>
        )}
        {!loading && apartments.apartments != 0 && (
          <table className="w-max min-w-full">
            <thead className="w-max">
              <tr className="w-max relative">
                <th className="text-start bg-white py-2 px-4 w-max sticky left-0">
                  CODE
                </th>
                <th className="text-start bg-white py-2 px-4 w-max">ADDRESS</th>
                <th className="text-start bg-white py-2 px-4 w-max">
                  MONTHLY PAYMENT
                </th>
                <th className="text-start bg-white py-2 px-4 w-max">STATUS</th>
                <th className="text-start bg-white py-2 px-4 w-max">
                  UNPAID INVOICES
                </th>
                <th className="text-start bg-white py-2 px-4 w-max">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => (
                <tr key={apartment._id} className="w-max relative">
                  <td className="w-max bg-white py-2 px-4 sticky left-0">
                    {apartment.number}
                  </td>
                  <td className="bg-white py-2 px-4 w-max">
                    {apartment.address}
                  </td>
                  <td className="bg-white py-2 px-4 w-max">{`${apartment.monthlyPayment} $`}</td>
                  <td className="bg-white py-2 px-4 w-max">
                    <ApartmentStatus status={apartment.status} />
                  </td>
                  <td className="bg-white py-2 px-4 w-max">
                    {apartment.unpaidInvoicesCount}
                  </td>
                  <td className="bg-white py-2 px-4 w-max flex gap-2">
                    <button className="p-1 px-2 bg-blue-200 rounded-md text-blue-600">
                      <i className="uil uil-eye"></i>
                    </button>
                    <button onClick={()=>setToEdit(apartment._id)} className="p-1 px-2 bg-yellow-200 rounded-md text-yellow-600">
                      <i className="uil uil-edit"></i>
                    </button>
                    <button className="p-1 px-2 bg-green-200 rounded-md text-green-600">
                      <i className="uil uil-trash"></i>
                    </button>
                    <button className="p-1 px-2 bg-red-200 rounded-md text-red-600">
                      <i className="uil uil-print"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex mt-4">
        <div>pagination</div>
        <button className="ms-auto p-2 bg-purple-500 text-white font-bold hover:px-4 transition-all rounded-md">
          download report
        </button>
      </div>
      
    </div>
    {toEdit && <UpdateModal open={toEdit} setOpen={setToEdit} id={toEdit}/>}
    </>
  );
};

export default Apartments;
