import { useEffect, useState } from "react";
import logo from "/images/logo.png";
import utils from "../../utils";
import { clearMessage, login, me } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const message = useSelector((state) => state.users.message);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    let errors = utils.userValidation(user);
    console.log(errors);
    if (errors.length) {
      setError(errors[0]);
      return;
    } else {
      setError("");
    }
    dispatch(login(user));
  };
  useEffect(() => {
    console.log(message);
    if (message && message.type == "error") {
      setError(message.content);
      dispatch(clearMessage());
    } else if (message?.content == "Logged In") {
      dispatch(me());
      dispatch(clearMessage());
      navigate("/");
    }
  }, [message]);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-3">
        <img src={logo} className="h-[80px]" alt="" />
        <h1 className="text-3xl">CotiZen</h1>
      </div>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-[20%] flex flex-col gap-5"
        style={{ minWidth: "320px" }}
      >
        {error && (
          <div className="w-full rounded-md text-start bg-red-200 px-3 py-2 flex justify-between">
            <h3 className=" text-red-600 font-semibold ">{error}</h3>
            <button className="text-red-600" onClick={() => setError("")}>
              <i className="uil uil-times"></i>
            </button>
          </div>
        )}
        <input
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          value={user.email}
          className="font-light p-3 py-3 bg-gray-100 rounded-lg focus:outline-none "
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          value={user.password}
          className="font-light p-3 py-3 bg-gray-100 rounded-lg focus:outline-none "
          placeholder="Password"
        />
        <button
          onClick={handleSubmit}
          className="bg-gray-700 py-3 rounded-lg text-white active:scale-[0.98]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
