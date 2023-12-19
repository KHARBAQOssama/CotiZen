const ApartmentStatus = ({status}) => {
  return (
    <span
        className={`
            ${
                status == "available" ?
                "bg-green-200 text-green-600" : 
                status == "in_maintenance" ?
                "bg-yellow-200 text-yellow-600" : 
                status == "occupied" ?
                "bg-red-200 text-red-600" : ""

            }
             rounded-xl px-2 pb-1
        `}
    >{status}</span>
  )
}

export default ApartmentStatus