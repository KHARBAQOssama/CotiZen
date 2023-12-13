import { useEffect, useState } from "react";
import utils from "../../utils";

const Statics = () => {
  const [date, setDate] = useState();
  useEffect(() => {
    setDate(utils.todayDate());
  }, []);
  return (
    <div className="flex-1 relative h-[100vh] overflow-y-scroll">
      <header className="py-8 px-2">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </header>
      <section className="flex flex-wrap gap-3 px-2">
        <div
          className="flex-1 bg-gray-200 rounded-md p-5 px-8 flex flex-col gap-5"
          style={{ minWidth: "320px" }}
        >
          <div className="flex text-2xl">
            <h3 className="">
              <i className="uil uil-building"></i> Apartments
            </h3>
            <span className="ml-auto font-bold">200</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
                <span>occupied</span>
                <span>102</span>
            </div>
            <div className="flex flex-col items-center">
                <span>Available</span>
                <span>44</span>
            </div>
            <div className="flex flex-col items-center">
                <span>In maintenance</span>
                <span>54</span>
            </div>
          </div>
        </div>
        <div
          className="flex-1 bg-gray-200 rounded-md p-5 px-8 flex flex-col gap-5"
          style={{ minWidth: "320px" }}
        >
          <div className="flex text-2xl">
            <h3 className="">
              <i className="uil uil-invoice"></i> Invoices
            </h3>
            <span className="ml-auto font-bold">200</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
                <span>Payed</span>
                <span>102</span>
            </div>
            <div className="flex flex-col items-center">
                <span>Unpaid</span>
                <span>44</span>
            </div>
          </div>
        </div>
        <div
          className="flex-1 bg-gray-200 rounded-md p-5 px-8 flex flex-col gap-5"
          style={{ minWidth: "320px" }}
        >
          <div className="flex text-2xl">
            <h3 className="">
              <i className="uil uil-building"></i> Payments
            </h3>
            <span className="ml-auto font-bold">200</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
                <span>Cash</span>
                <span>102</span>
            </div>
            <div className="flex flex-col items-center">
                <span>Available</span>
                <span>O</span>
            </div>
          </div>
        </div>
        <div
          className="flex-1 bg-gray-200 rounded-md p-5 px-8 flex flex-col gap-5"
          style={{ minWidth: "320px" }}
        >
          <div className="flex text-2xl">
            <h3 className="">
              <i className="uil uil-building"></i> Apartments
            </h3>
            <span className="ml-auto font-bold">200</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
                <span>occupied</span>
                <span>102</span>
            </div>
            <div className="flex flex-col items-center">
                <span>Available</span>
                <span>44</span>
            </div>
            <div className="flex flex-col items-center">
                <span>In maintenance</span>
                <span>54</span>
            </div>
          </div>
        </div>
      </section>
      <section className="p-3 w-full overflow-x-scroll">
        <table className="w-full">
            <thead className="w-full">
                <tr className=" bg-gray-200">
                    <th className="w-auto p-2 text-start" style={{minWidth:"200px"}}>Code</th>
                    <th className="w-auto p-2 text-start" style={{minWidth:"200px"}}>Monthly Amount</th>
                    <th className="w-auto p-2 text-start" style={{minWidth:"200px"}}>Status</th>
                    <th className="w-auto p-2 text-start" style={{minWidth:"200px"}}>Unpaid Invoices</th>
                    <th className="w-auto p-2 text-start" style={{minWidth:"200px"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b-2">
                    <td className="p-2">A101</td>
                    <td className="p-2">1500 £</td>
                    <td className="p-2">Occupied</td>
                    <td className="p-2">5</td>
                    <td className="p-2">Delete</td>
                </tr>
                <tr className="border-b-2">
                    <td className="p-2">A101</td>
                    <td className="p-2">1500 £</td>
                    <td className="p-2">Occupied</td>
                    <td className="p-2">5</td>
                    <td className="p-2">Delete</td>
                </tr>
                <tr className="border-b-2">
                    <td className="p-2">A101</td>
                    <td className="p-2">1500 £</td>
                    <td className="p-2">Occupied</td>
                    <td className="p-2">5</td>
                    <td className="p-2">Delete</td>
                </tr>
                <tr className="border-b-2">
                    <td className="p-2">A101</td>
                    <td className="p-2">1500 £</td>
                    <td className="p-2">Occupied</td>
                    <td className="p-2">5</td>
                    <td className="p-2">Delete</td>
                </tr>
                <tr className="border-b-2">
                    <td className="p-2">A101</td>
                    <td className="p-2">1500 £</td>
                    <td className="p-2">Occupied</td>
                    <td className="p-2">5</td>
                    <td className="p-2">Delete</td>
                </tr>
                <tr className="border-b-2">
                    <td className="p-2">A101</td>
                    <td className="p-2">1500 £</td>
                    <td className="p-2">Occupied</td>
                    <td className="p-2">5</td>
                    <td className="p-2">Delete</td>
                </tr>
                <tr className="border-b-2">
                    <td className="p-2">A101</td>
                    <td className="p-2">1500 £</td>
                    <td className="p-2">Occupied</td>
                    <td className="p-2">5</td>
                    <td className="p-2">Delete</td>
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

export default Statics;
