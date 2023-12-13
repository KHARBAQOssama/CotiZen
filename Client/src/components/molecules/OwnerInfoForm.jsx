const OwnerInfoForm = () => {
  return (
    <div className="w-full gap-5 flex flex-col">
      <h3 className="text-gray-600 text-xl font-light">Owner Info</h3>
      <input
        type="text"
        className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
        placeholder="Full Name"
      />
      <input
        type="text"
        className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
        placeholder="Phone Number"
      />
      <input
        type="text"
        className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
        placeholder="Email"
      />
    </div>
  );
};

export default OwnerInfoForm;
