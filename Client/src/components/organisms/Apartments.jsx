import { useEffect, useState } from "react";
import utils from "../../utils";

const Apartments = () => {
  const [date, setDate] = useState();
  useEffect(() => {
    setDate(utils.todayDate());
  }, []);
  return (
    <div className="flex-1 relative h-[100vh] overflow-y-scroll">
      <header className="py-8 px-2">
        <h1 className="font-bold text-2xl">APARTMENTS</h1>
      </header>
      <div className="w-full flex gap-2 px-3">
        <input
          type="text"
          placeholder="Filter by unique code"
          className="p-3 bg-gray-100 rounded-md ml-auto transition-all focus:scale-x-[1.15] focus:me-3 focus:outline-none"
        />
        <select name="" className="px-4 bg-gray-100 rounded-md" id="">
          <option value="">All</option>
          <option value="">Occupied</option>
          <option value="">Available</option>
          <option value="">In maintenance</option>
        </select>
        <button className="bg-gray-700 w-max text-white px-4 rounded-md">
          Filter
        </button>
      </div>
      <section className="p-3 w-full overflow-x-scroll lg:overflow-hidden flex flex-col gap-3">
        <table className="w-full">
          <thead className="w-full rounded-md">
            <tr className=" bg-gray-200">
              <th
                className="w-auto p-2 text-start"
                style={{ minWidth: "200px" }}
              >
                Code
              </th>
              <th
                className="w-auto p-2 text-start"
                style={{ minWidth: "200px" }}
              >
                Monthly Amount
              </th>
              <th
                className="w-auto p-2 text-start"
                style={{ minWidth: "200px" }}
              >
                Status
              </th>
              <th
                className="w-auto p-2 text-start"
                style={{ minWidth: "200px" }}
              >
                Unpaid Invoices
              </th>
              <th
                className="w-auto p-2 text-start"
                style={{ minWidth: "200px" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2">
              <td className="p-2">A101</td>
              <td className="p-2">1500 £</td>
              <td className="p-2">
                <span className="py-1 px-3 text-red-600 font-semibold rounded-2xl bg-red-200 my-1">
                  Occupied
                </span>
              </td>
              <td className="p-2">5</td>
              <td className="p-2 flex gap-1">
                <button>
                  <i className="uil uil-eye bg-green-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-edit-alt bg-yellow-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-trash bg-red-200 p-1 px-2 rounded-xl"></i>
                </button>
              </td>
            </tr>
            <tr className="border-b-2">
              <td className="p-2">A101</td>
              <td className="p-2">1500 £</td>
              <td className="p-2">
                <span className="py-1 px-3 text-yellow-600 font-semibold rounded-2xl bg-yellow-100 my-1">
                  In maintenance
                </span>
              </td>
              <td className="p-2">5</td>
              <td className="p-2 flex gap-1">
                <button>
                  <i className="uil uil-eye bg-green-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-edit-alt bg-yellow-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-trash bg-red-200 p-1 px-2 rounded-xl"></i>
                </button>
              </td>
            </tr>
            <tr className="border-b-2">
              <td className="p-2">A101</td>
              <td className="p-2">1500 £</td>
              <td className="p-2">
                <span className="py-1 px-3 text-red-600 font-semibold rounded-2xl bg-red-200 my-1">
                  Occupied
                </span>
              </td>
              <td className="p-2">5</td>
              <td className="p-2 flex gap-1">
                <button>
                  <i className="uil uil-eye bg-green-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-edit-alt bg-yellow-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-trash bg-red-200 p-1 px-2 rounded-xl"></i>
                </button>
              </td>
            </tr>
            <tr className="border-b-2">
              <td className="p-2">A101</td>
              <td className="p-2">1500 £</td>
              <td className="p-2">
                <span className="py-1 px-3 text-green-600 font-semibold rounded-2xl bg-green-200 my-1">
                  Available
                </span>
              </td>
              <td className="p-2">5</td>
              <td className="p-2 flex gap-1">
                <button>
                  <i className="uil uil-eye bg-green-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-edit-alt bg-yellow-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-trash bg-red-200 p-1 px-2 rounded-xl"></i>
                </button>
              </td>
            </tr>
            <tr className="border-b-2">
              <td className="p-2">A101</td>
              <td className="p-2">1500 £</td>
              <td className="p-2">
                <span className="py-1 px-3 text-red-600 font-semibold rounded-2xl bg-red-200 my-1">
                  Occupied
                </span>
              </td>
              <td className="p-2">5</td>
              <td className="p-2 flex gap-1">
                <button>
                  <i className="uil uil-eye bg-green-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-edit-alt bg-yellow-200 p-1 px-2 rounded-xl"></i>
                </button>
                <button>
                  <i className="uil uil-trash bg-red-200 p-1 px-2 rounded-xl"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className="absolute flex gap-3 top-1 right-1 p-2 rounded-md bg-gray-200">
        <i className="uil uil-calender"></i>
        {date}
      </div>
    </div>
  );
};

export default Apartments;
