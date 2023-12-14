const AppartementInfo1 = () => {
  return (
    <div className="w-full gap-5 flex flex-col">
      <textarea
        rows={2}
        className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
        placeholder="Address"
      ></textarea>
      <select
        value={null}
        type="text"
        className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
        placeholder="Phone Number"
      >
        <option className="font-light" value="">Status</option>
        <option className="font-light" value="occupied">Occupied</option>
        <option className="font-light" value="in_maintenance">In maintenance</option>
        <option className="font-light" value="available">Available</option>
      </select>
      <textarea
        rows={4}
        className="bg-gray-100 p-2 py-3 w-full rounded-md font-light"
        placeholder="Description"
      ></textarea>
    </div>
  )
}

export default AppartementInfo1