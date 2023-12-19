import { useEffect, useState } from "react";
import Sidebar from "../organisms/Sidebar";
import utils from "../../utils";
import AddModal from "../organisms/AddModal";

const Dashboard = ({ children }) => {
  const [openModal,setOpenModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [date, setDate] = useState();
  useEffect(() => {
    setDate(utils.todayDate());
  }, []);
  return (
    <div className="flex relative items-start ">
      <Sidebar openSidebar={openSidebar} setOpenModal={setOpenModal} />
      {children}
      
      <button
        className={`lg:hidden z-50 absolute top-0 flex justify-end items-start px-8 py-1  text-black ${
          openSidebar
            ? `right-0 h-[100vh] w-[100vw - 275px] bg-gray-200`
            : "left-0"
        }`}
        onClick={() => setOpenSidebar(!openSidebar)}
        style={openSidebar ? { width: "calc(100VW - 275px)" } : {}}
      >
        {openSidebar ? <i className="uil uil-multiply"></i> : <i className="uil uil-bars"></i> }
      </button>
      <div className="absolute flex text-white gap-3 top-1 right-8 p-2 rounded-md bg-purple-600">
        <i className="uil uil-calender"></i>
        {date}
      </div>
      <AddModal open={openModal} setOpen={setOpenModal}/>
    </div>
  );
};

export default Dashboard;
