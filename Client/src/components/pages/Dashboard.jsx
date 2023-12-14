import Sidebar from "../organisms/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex overflow-hidden">
      <Sidebar/>
      {children}
    </div>
  );
};

export default Dashboard;
