import { useEffect, useState } from "react";
import utils from "../../utils";
import {
  getAllApartments,
  createApartment,
  clearMessage,
} from "../../redux/actions/apartmentActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddModal = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.apartments.message);
  const [error, setError] = useState("");
  const [apartment, setApartment] = useState({
    number: "",
    address: "",
    monthlyPayment: "",
    status: "available",
  });
  const handleChange = (e) => {
    setApartment({ ...apartment, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    let errors = utils.apartmentValidation(apartment);
    if (errors.length) {
      setError(errors[0]);
      return;
    } else {
      setError("");
    }
    dispatch(createApartment(apartment));
  };
  const closeForm = () => {
    setOpen(!open);
    setApartment({
      number: "",
      address: "",
      monthlyPayment: "",
      status: "available",
    });
    dispatch(clearMessage());
    dispatch(getAllApartments());
    navigate("/admin/apartments");
  };
  // useEffect(() => {
  //   if (done) {
  //     setOpen(!open);
  //     setApartment({
  //       number: "",
  //       address: "",
  //       monthlyPayment: "",
  //       status: "available",
  //     });
  //     dispatch(clearMessage())
  //     navigate("/admin/apartments");
  //   }
  // }, [dispatch]);
  return (
    <>
      {open && (
        <div className="z-50 w-[100%] h-[100vh] flex absolute top-0 left-0 bg-opacity-20 bg-black">
          <form
            action=""
            className="flex-col flex gap-5 m-auto relative rounded-tr-md bg-white p-5 px-8 rounded-2xl w-[30%] min-w-[300px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {(!message || !message.content) && (
              <>
                <h1 className="text-3xl py-2">Add Apartment</h1>
                <button
                  onClick={() => setOpen(!open)}
                  className="absolute right-8 text-xl top-8 text-gray-300 hover:text-black"
                >
                  <i className="uil uil-times"></i>
                </button>
                <div className="w-full gap-5 flex flex-col">
                  {error && (
                    <div className="w-full rounded-md text-start bg-red-200 px-3 py-2 flex justify-between">
                      <h3 className=" text-red-600 font-semibold ">{error}</h3>
                      <button
                        className="text-red-600"
                        onClick={() => setError("")}
                      >
                        <i className="uil uil-times"></i>
                      </button>
                    </div>
                  )}

                  <input
                    type="text"
                    className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
                    placeholder="Apartment Code"
                    name="number"
                    value={apartment.number}
                    onChange={(e) => handleChange(e)}
                  />
                  <textarea
                    className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
                    placeholder="Apartment Address"
                    name="address"
                    value={apartment.address}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  <input
                    type="number"
                    className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
                    placeholder="Apartment Monthly Payment"
                    name="monthlyPayment"
                    value={apartment.monthlyPayment}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <button className=" bg-purple-600 text-white ms-auto px-5 p-1 border-2 border-purple-600 rounded-md hover:bg-purple-700">
                  Submit
                </button>
              </>
            )}
            {message && message.content && (
              <div className="flex flex-col gap-5">
                <h3 className="text-center text-xl font-bold text-green-500">
                  {message.content}
                </h3>
                <button
                  onClick={() => {
                    closeForm();
                  }}
                  className="bg-green-500 text-white w-max py-2 px-12 m-auto rounded-md"
                >
                  close
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default AddModal;
