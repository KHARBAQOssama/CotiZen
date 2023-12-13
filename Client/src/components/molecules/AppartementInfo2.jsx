import { useEffect, useState } from "react";

const AppartementInfo2 = () => {
  const [utilities, setUtilities] = useState([]);
//   const [newUtility, setNewUtility] = useState("");
  const checkNewUtility = (e) => {
    let value = e.target.value;
    if (value.includes("\n")) {
      let utility = value
        .split("")
        .splice(0, value.length - 1)
        .join("");
      if (utility != "") {
        let items = utilities.concat([utility])
        setUtilities(items)
        console.log(utilities);
        // setNewUtility(utility);y
        e.target.value = ""
      }
    }
  };
//   useEffect(() => {
//     if (!utilities.includes(newUtility) && newUtility != "") {
//       utilities.push(newUtility);
//         setUtilities(utilities);
//     }
//     console.log(utilities);
//   }, [newUtility]);
  return (
    <div className="w-full gap-5 flex flex-col">
      <div className="w-full flex flex-wrap gap-5">
        <input
          type="number"
          placeholder="Rooms"
          className="bg-gray-100 p-2 flex-1 w-[48%]  py-3 rounded-md font-light "
        />
        <input
          type="number"
          placeholder="floors"
          className="bg-gray-100 p-2 flex-1 w-[48%]  py-3 rounded-md font-light "
        />
      </div>
      <div className="w-full flex flex-wrap gap-5">
        <input
          type="number"
          placeholder="Surfaces"
          className="bg-gray-100 p-2 flex-1 w-[48%]  py-3 rounded-md font-light "
        />
        <input
          type="number"
          placeholder="Year Built"
          className="bg-gray-100 p-2 flex-1 w-[48%]  py-3 rounded-md font-light "
        />
      </div>
      {utilities.length != 0 && (
        <div className="flex flex-wrap gap-2">
          {utilities.map((utility, index) => {
            <span
              key={index}
              className="px-4 p-2 bg-gray-100 rounded-md text-gray-500"
            >
              {utility}
            </span>;
          })}
        </div>
      )}
      <textarea
        placeholder="Utilities"
        onChange={(e) => checkNewUtility(e)}
        rows={1}
        className="bg-gray-100 p-2 w-full py-3 rounded-md font-light "
      ></textarea>
    </div>
  );
};

export default AppartementInfo2;
