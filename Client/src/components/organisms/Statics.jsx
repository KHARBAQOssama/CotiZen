import { useEffect, useState } from "react";
import utils from "../../utils";
import { getAllApartments } from "../../redux/actions/apartmentActions";
import ApartmentStatus from "../molecules/ApartmentStatus";
import { useDispatch, useSelector } from "react-redux";

const Statics = () => {
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const apartments = useSelector((state) => state.apartments.apartments);
  useEffect(() => {
    dispatch(getAllApartments());
  }, [dispatch]);

  useEffect(() => {
    setDate(utils.todayDate());
  }, []);
  return (
    <div className="flex-1 h-[100vh] overflow-y-scroll relative bg-gray-100 p-8">
      <h1 className="font-extrabold text-3xl ">Dashboard</h1>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 ">
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-md dark:!bg-navy-800 dark:text-white !flex-row flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex bg-purple-600 rounded-full p-3 items-center text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600">
              Earnings
            </p>
            <h4 className="text-xl font-bold text-purple-600">$340.5</h4>
          </div>
        </div>
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-md dark:!bg-navy-800 dark:text-white !flex-row flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex bg-purple-600 rounded-full p-3 items-center text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M298.39 248a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V236a12 12 0 0012 12z"></path>
                  <path d="M197 267a43.67 43.67 0 01-13-31v-92h-72a64.19 64.19 0 00-64 64v224a64 64 0 0064 64h144a64 64 0 0064-64V280h-92a43.61 43.61 0 01-31-13zm175-147h70.39a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V108a12 12 0 0012 12z"></path>
                  <path d="M372 152a44.34 44.34 0 01-44-44V16H220a60.07 60.07 0 00-60 60v36h42.12A40.81 40.81 0 01231 124.14l109.16 111a41.11 41.11 0 0111.83 29V400h53.05c32.51 0 58.95-26.92 58.95-60V152z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600">
              Spend this month
            </p>
            <h4 className="text-xl font-bold  text-purple-600">$642.39</h4>
          </div>
        </div>
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-md dark:!bg-navy-800 dark:text-white !flex-row flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex bg-purple-600 rounded-full p-3 items-center text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600">Sales</p>
            <h4 className="text-xl font-bold  text-purple-600">$574.34</h4>
          </div>
        </div>
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-md dark:!bg-navy-800 dark:text-white !flex-row flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex bg-purple-600 rounded-full p-3 items-center text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600">
              Your Balance
            </p>
            <h4 className="text-xl font-bold  text-purple-600">$1,000</h4>
          </div>
        </div>
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-md dark:!bg-navy-800 dark:text-white !flex-row flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex bg-purple-600 rounded-full p-3 items-center text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600">
              New Tasks
            </p>
            <h4 className="text-xl font-bold  text-purple-600 ">145</h4>
          </div>
        </div>
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-md dark:!bg-navy-800 dark:text-white !flex-row flex-grow items-center rounded-[20px]">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex bg-purple-600 rounded-full p-3 items-center text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600">
              Total Projects
            </p>
            <h4 className="text-xl font-bold  text-purple-600">$2433</h4>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2">
        <div className="!z-5 relative bg-white bg-clip-border shadow-md dark:!bg-navy-800 p-5 items-center rounded-[20px]">
          <div className="w-full mb-3 flex items-center">
            <h3 className="font-bold text-xl">Apartments</h3>
            <span className="ms-auto font-light text-sm cursor-pointer hover:text-blue-500">
              view All
            </span>
          </div>

          <table className="w-full text-start">
            <thead>
              <tr>
                <th className="text-start">code</th>
                <th className="text-start">unpaid invoices</th>
                <th className="text-start">status</th>
              </tr>
            </thead>
            <tbody className="text-start">
              {apartments !== "empty" &&
                apartments.map((apartment, index) => {
                  if (index < 5) {
                    return (
                      <tr key={index} className="h-[35px]">
                        <td>{apartment.number}</td>
                        <td>{apartment.unpaidInvoicesCount}</td>
                        <td>
                          <ApartmentStatus status={apartment.status} />
                        </td>
                      </tr>
                    );
                  }
                  return null; 
                })}
            </tbody>
          </table>
        </div>
        <div className="!z-5 relative bg-white bg-clip-border shadow-md dark:!bg-navy-800 p-5 items-center rounded-[20px]">
          <div className="w-full mb-3 flex items-center">
            <h3 className="font-bold text-xl">Invoices</h3>
            <span className="ms-auto font-light text-sm cursor-pointer hover:text-blue-500">
              view All
            </span>
          </div>

          <table className="w-full text-start">
            <thead>
              <tr>
                <th className="text-start">AP.code</th>
                <th className="text-start">month</th>
                <th className="text-start">status</th>
              </tr>
            </thead>
            <tbody className="text-start">
              <tr className="h-[35px]">
                <td>#SD34</td>
                <td className="font-semibold">July 2022</td>
                <td>
                  <span className="pb-1 px-3 bg-red-200 text-red-600 rounded-xl">
                    Unpaid
                  </span>
                </td>
              </tr>
              <tr className="h-[35px]">
                <td>#ZER56</td>
                <td className="font-semibold">July 2022</td>
                <td>
                  <span className="pb-1 px-3 bg-red-200 text-red-600 rounded-xl">
                    Unpaid
                  </span>
                </td>
              </tr>
              <tr className="h-[35px]">
                <td>#CFTG45</td>
                <td className="font-semibold">July 2022</td>
                <td>
                  <span className="pb-1 px-3 bg-red-200 text-red-600 rounded-xl">
                    Unpaid
                  </span>
                </td>
              </tr>
              <tr className="h-[35px]">
                <td>#45SXC</td>
                <td className="font-semibold">July 2022</td>
                <td>
                  <span className="pb-1 px-3 bg-yellow-200 text-yellow-600 rounded-xl">
                    Partially Paid
                  </span>
                </td>
              </tr>
              <tr className="h-[35px]">
                <td>#3DF45</td>
                <td className="font-semibold">July 2022</td>
                <td>
                  <span className="pb-1 px-3 bg-red-200 text-red-600 rounded-xl">
                    Unpaid
                  </span>
                </td>
              </tr>
              <tr className="h-[35px]">
                <td>#T6Y6R</td>
                <td className="font-semibold">July 2022</td>
                <td>
                  <span className="pb-1 px-3 bg-green-200 text-green-600 rounded-xl">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statics;
