import { useState } from "react";
import logo from "../../../public/images/logo.png";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <aside 
        onMouseOver={()=>setOpen(true)} 
        onMouseLeave={()=>setOpen(false)} 
        className={`${open ? 'w-[240px]' : 'w-'} p-3 bg-black transition-all`}>
        <header>
            hello
        </header>
      </aside>
    </>
  );
};

export default Sidebar;
