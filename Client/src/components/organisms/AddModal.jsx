import { useState } from "react";
import OwnerInfoForm from "../molecules/OwnerInfoForm";
import AppartementInfo1 from "../molecules/AppartementInfo1";
import AppartementInfo2 from "../molecules/AppartementInfo2";

const AddModal = ({ open,toggleOpen }) => {
  const [step, setStep] = useState(1);
  const [appartementOwner, setAppartementOwner] = useState({
    email: "",
    full_name: "",
    phone_number: "",
  });
  return (
    <>
      {open && (
        <div className="w-[100vw] h-[100vh] flex absolute top-0 left-0 bg-opacity-5 bg-black">
          <form
            action=""
            className="flex-col flex gap-5 m-auto relative rounded-tr-md bg-white p-5 px-8 rounded-2xl w-[30%]"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-3xl py-2">Add Appartement</h1>
            <button onClick={toggleOpen} className="absolute right-8 text-xl top-8 text-gray-300 hover:text-black">x</button>
            {step == 1 && <OwnerInfoForm/>}
            {step == 2 && <AppartementInfo1/>}
            {step == 3 && <AppartementInfo2/>}
            <div className="flex">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="bg-gray-50 text-gray-500 px-5 p-1 border-2 border-gray-50 rounded-md hover:border-black hover:text-black"
                >
                  prev
                </button>
              )}
              {step != 3 && (
                <button
                  onClick={() => setStep(step + 1)}
                  className=" bg-purple-600 text-white ms-auto px-5 p-1 border-2 border-purple-600 rounded-md hover:bg-purple-700"
                >
                  next
                </button>
              )}
              {step == 3 && (
                <button className=" bg-purple-600 text-white ms-auto px-5 p-1 border-2 border-purple-600 rounded-md hover:bg-purple-700">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddModal;
