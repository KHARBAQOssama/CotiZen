import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
const Sidebar = ({openSidebar,setOpenModal}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState();
  const user = useSelector((state) => state.users.user);
  const message = useSelector((state) => state.users.message);
  const location = useLocation();
  const navigate = useNavigate();
  const removeAdminPath = (inputString) => {
    const resultWithoutSlash = inputString.replace(/\/admin\//, "/");
    const resultWithout = resultWithoutSlash.replace(/\/admin/, "");
    return resultWithout;
  };
  const handleLogOut = () =>{
    dispatch(logout());
  }
  useEffect(() => {
    const activeTab = removeAdminPath(location.pathname);
    setActive(activeTab);
  }, []);
  useEffect(()=>{
    
  })
  return (
      <aside
        className={`h-[100vh] lg:w-[275px] lg:relative transition-all ${
          openSidebar
            ? `w-[100vw] absolute top-0 left-0 z-30`
            : "w-0 overflow-hidden"
        }`}
      >
        <div className="w-full h-full relative max-w-[275px] bg-white">
          <header className="w-full py-8">
            <h1 className="text-3xl w-full text-center font-extrabold">
              CotiZen
            </h1>
          </header>
          <ul className="w-full">
            <li  onClick={() => {
                navigate("/admin");
                setActive("");
              }}
              className={`${active == "" ? "border-r-4 border-purple-600" : ""} w-full flex gap-3 items-center p-3 text-xl hover:bg-purple-100`}
           >
              <i className="uil uil-swatchbook"></i>
              Dashboard
            </li>
            <li
              onClick={() => {
                navigate("/admin/apartments");
                setActive("/apartments");
              }}
              className={`${active == "/apartments" ? "border-r-4 border-purple-600" : ""} w-full flex gap-3 items-center p-3 text-xl hover:bg-purple-100`}
            >
              <i className="uil uil-building"></i>
              Apartments
            </li>
            <li
              onClick={() => {
                navigate("/admin/payments");
                setActive("/payments");
              }}
              className={`${active == "/payments" ? "border-r-4 border-purple-600" : ""} w-full flex gap-3 items-center p-3 text-xl hover:bg-purple-100`}
            >
              <i className="uil uil-invoice"></i>
              Payments
            </li>
            <li
              onClick={() => {
                navigate("/admin/invoices");
                setActive("/invoices");
              }}
              className={`${active == "/invoices" ? "border-r-4 border-purple-600" : ""} w-full flex gap-3 items-center p-3 text-xl hover:bg-purple-100`}
            >
              <i className="uil uil-invoice"></i>
              Invoices
            </li>
            <li
              
              className={`rounded-xl w-max m-auto bg-yellow-300 mt-8 flex gap-3 items-center p-3 text-xl hover:bg-purple-100`}
            >
              <i className="uil uil-user"></i>
              {user.full_name}
              <button onClick={handleLogOut} className="bg-white p-2 rounded-3xl">
               <i className="uil uil-sign-out-alt"></i>
              </button>
            </li>
          </ul>
          <button className="absolute bottom-8 left-[50%] translate-x-[-50%] bg-purple-600 text-white rounded-xl font-semibold p-3" onClick={()=>setOpenModal(true)}>Add Apartment</button>
        </div>
      </aside>
  );
};

export default Sidebar;
