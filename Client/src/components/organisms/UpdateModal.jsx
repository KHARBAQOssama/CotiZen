import { useState, useEffect } from "react";
import utils from "../../utils";
import {
  clearMessage,
  getOneApartment,
  updateApartment,
} from "../../redux/actions/apartmentActions";
import { useDispatch, useSelector } from "react-redux";

const UpdateModal = ({ open, setOpen, id }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.apartments.message);
  const apartment = useSelector((state) => state.apartments.apartment);
  const [apartmentToEdit, setApartmentToEdit] = useState(null);
  const [resident, setResident] = useState({name:null,phoneNumber:null,email:null,nationalId:null});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setApartmentToEdit({ ...apartmentToEdit, [e.target.name]: e.target.value });
  };
  const handleResidentChange = (e) => {
    setResident({ ...resident, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    let errors = utils.updateApartmentValidation(
      apartment,
      apartmentToEdit,
      resident
    );
    if (errors.length) {
      setError(errors[0]);
      return;
    } else {
      setError("");
    }
    let ap = {
      ...apartmentToEdit,
    };

    delete apartmentToEdit.__v
    delete resident._id
    delete resident.startDate
    if(apartmentToEdit.status == "occupied")
      apartmentToEdit.resident = resident
    dispatch(updateApartment(id, apartmentToEdit));
  };

  useEffect(() => {
    dispatch(getOneApartment(id));
  }, [dispatch]);
  useEffect(() => {
    if (apartment) {
      setApartmentToEdit(apartment);
      let lastResident = apartment.residentsHistory[apartment.residentsHistory.length - 1]
      if (
        apartment.status == "occupied"
        && lastResident
        && !lastResident.endDate
      ) {
        setResident(
          apartment.residentsHistory[apartment.residentsHistory.length - 1]
        );
      }
    }
  }, [apartment]);
  return (
    <>
      {open && (
        <div className="w-[100vw] h-[100vh] flex absolute top-0 left-0 bg-opacity-20 bg-black">
          <form
            action=""
            className="flex-col flex gap-2 m-auto relative rounded-tr-md bg-white p-5 px-8 rounded-2xl w-[30%] min-w-[300px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {!apartmentToEdit && <div>Loading ...</div>}
            {(!message || !message.content) && apartmentToEdit && (
              <>
                <h1 className="text-3xl py-2">Update Apartment</h1>
                <button
                  onClick={() => setOpen(!open)}
                  className="absolute right-8 text-xl top-8 text-gray-300 hover:text-black"
                >
                  <i className="uil uil-times"></i>
                </button>
                <div className="w-full gap-2 flex flex-col">
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
                    value={apartmentToEdit.number}
                    onChange={(e) => handleChange(e)}
                  />
                  <textarea
                    className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
                    placeholder="Apartment Address"
                    name="address"
                    value={apartmentToEdit.address}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  <input
                    type="number"
                    className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
                    placeholder="Apartment Monthly Payment"
                    name="monthlyPayment"
                    value={apartmentToEdit.monthlyPayment}
                    onChange={(e) => handleChange(e)}
                  />
                  <select
                    className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
                    name="status"
                    id=""
                    value={apartmentToEdit.status}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="occupied">Occupied</option>
                    <option value="available">Available</option>
                    <option value="in_maintenance">In Maintenance</option>
                  </select>
                </div>
                {apartmentToEdit.status == "occupied" && (
                  <div className="flex flex-col gap-2">
                    <h3>Current Resident Info</h3>
                    <div className="flex gap-2 flex-wrap">
                      <input
                        className="bg-gray-100 p-2 py-3 flex-1 rounded-md font-light"
                        name="name"
                        id=""
                        placeholder="Resident Name"
                        value={resident.name}
                        onChange={(e) => handleResidentChange(e)}
                      />
                      <input
                        className="bg-gray-100 p-2 py-3 flex-1 rounded-md font-light"
                        name="email"
                        id=""
                        value={resident.email}
                        placeholder="Resident Email"
                        onChange={(e) => handleResidentChange(e)}
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <input
                        className="bg-gray-100 p-2 py-3 flex-1 rounded-md font-light"
                        name="nationalId"
                        id=""
                        placeholder="Resident National Id"
                        value={resident.nationalId}
                        onChange={(e) => handleResidentChange(e)}
                      />
                      <input
                        className="bg-gray-100 p-2 py-3 flex-1 rounded-md font-light"
                        name="phoneNumber"
                        id=""
                        value={resident.phoneNumber}
                        placeholder="Resident Phone Number"
                        onChange={(e) => handleResidentChange(e)}
                      />
                    </div>
                  </div>
                )}
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
                    setOpen(!open);
                    dispatch(clearMessage());
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

export default UpdateModal;
