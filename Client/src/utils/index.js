const todayDate = ()=>{
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
     
    return formattedDate;
}

const apartmentValidation  = apartment=>{
    let errors = []
    if(!apartment.number){
        errors.push("code is require ")
    }
    if(!apartment.address){
        errors.push("address is require ")
    }
    if(!apartment.monthlyPayment){
        errors.push("monthly payment is require ")
    }

    return errors
}
export default{
    todayDate,
    apartmentValidation,
}