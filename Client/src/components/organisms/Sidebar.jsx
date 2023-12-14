import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const removeAdminPath = (inputString) => {
    const resultWithoutSlash = inputString.replace(/\/admin\//, "/");
    const resultWithout = resultWithoutSlash.replace(/\/admin/, "");
    return resultWithout;
  };
  useEffect(() => {
    const activeTab = removeAdminPath(location.pathname);
    setActive(activeTab);
  }, []);

  return (
      <aside
        className={`${
          !open ? "ml-[-240px]" : ""
        }  flex flex-col gap-12 p-3 w-[240px] h-[100vh] bg-gray-50 relative transition-all z-50`}
      >
        <h1 className="text-2xl font-extrabold">CotiZen</h1>
        <ul className="flex flex-col gap-2">
          <li

          onClick={()=>{navigate('/admin/');setActive('/')}}  
          className={`${
              active == "/" ? "bg-gray-200 border border-black" : ""
            } font-light p-2 hover:bg-gray-200 rounded-md flex gap-2`}
          >
            <i className="uil uil-border-vertical"></i>
            Dashboard
          </li>
          <li
            onClick={()=>{navigate('/admin/apartments'); setActive('/apartments')}}
            className={`${
              active == "/apartments" ? "bg-gray-200 border border-black" : ""
            } font-light p-2 hover:bg-gray-200 rounded-md flex gap-2`}
          >
            <i className="uil uil-building"></i>
            Apartments
            <span className="ml-auto bg-blue-400 text-white px-1 rounded-md font-bold text-sm">1</span>
          </li>
          <li
            onClick={()=>{navigate('/admin/invoices'); setActive('/invoices')}}
            className={`${
              active == "/invoices" ? "bg-gray-200 border border-black" : ""
            } font-light p-2 hover:bg-gray-200 rounded-md flex gap-2`}
          >
            <i className="uil uil-invoice"></i>
            Invoices
          </li>
          <li
            onClick={()=>{navigate('/admin/payments'); setActive('/payments')}}
            className={`${
              active == "/payments" ? "bg-gray-200 border border-black" : ""
            } font-light p-2 hover:bg-gray-200 rounded-md flex gap-2`}
          >
            <i className="uil uil-bill"></i>
            Payments
          </li>
          <li
            onClick={()=>{navigate('/admin/alerts'); setActive('/alerts')}}
            className={`${
              active == "/alerts" ? "bg-gray-200 border border-black" : ""
            } font-light p-2 hover:bg-gray-200 rounded-md flex gap-2`}
          >
            <i className="uil uil-exclamation-circle"></i>
            Alerts
          </li>
        </ul>
        <button
          onClick={() => setOpen(!open)}
          className="absolute right-[-30px] top-[0px] rounded-lg"
        >
          {open ? (
            <i className="uil uil-times text-2xl"></i>
          ) : (
            <i className="uil uil-bars text-2xl"></i>
          )}
        </button>
      </aside>
  );
};

export default Sidebar;
