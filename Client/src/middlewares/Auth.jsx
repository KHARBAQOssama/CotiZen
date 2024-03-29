import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({children}) => { 
  const authenticated = useSelector((state) => state.users.authenticated);
  const navigate = useNavigate();
  console.log(children); 
  useEffect(()=>{
    if (!authenticated) {
      navigate('/login')
    }
  },[authenticated])
  return (children);
};

export default RequireAuth;
