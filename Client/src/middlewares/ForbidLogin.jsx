import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForbidLogin = ({children}) => { 
  const authenticated = useSelector((state) => state.users.authenticated);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (authenticated) {
      navigate('/admin')
    }
  },[authenticated])
  return (children);
};

export default ForbidLogin;
