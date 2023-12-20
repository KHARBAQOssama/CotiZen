const todayDate = ()=>{
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
     
    return formattedDate;
}

const formatDate = (aDate)=>{
    const date = new Date(aDate);

    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate
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
const paymentValidation = (payment) =>{
  let errors = [];
  if (!payment.invoiceId) {
    errors.push("You should Select An Invoice For A specific Apartment");
  }
  if (!payment.amount) {
    errors.push("Amount is Required");
  }

  return errors;
}
const userValidation = (user) =>{
  let errors = [];
  if (!user.email) {
    errors.push("Email is Required");
  }
  if (!user.password) {
    errors.push("Password is Required");
  }

  return errors;
}
const updateApartmentValidation = (oldApartment, apartment, newResident = null) => {
  let errors = [];
  if (!apartment.number) {
    errors.push("code is require ");
  }
  if (!apartment.address) {
    errors.push("address is require ");
  }
  if (!apartment.monthlyPayment) {
    errors.push("monthly payment is require ");
  }
  if (
    apartment.status != oldApartment.status &&
    apartment.status == "occupied"
  ) {
      if (newResident) errors.concat(newResidentValidation(newResident));
      else errors.push("New Resident Info Is Required");
  }

  return errors;
};
const newResidentValidation = (newResident)=>{
    let errors = [];
    if (!newResident.name) {
      errors.push("resident name is require ");
    }
    if (!newResident.email) {
      errors.push("resident email is require ");
    }
    if (!newResident.nationalId) {
      errors.push("Resident National Id is require ");
    }
    if (!newResident.phoneNumber) {
      errors.push("Resident Phone Number Id is require ");
    }

    return errors;
}
export default {
  formatDate,
  todayDate,
  apartmentValidation,
  updateApartmentValidation,
  paymentValidation,
  userValidation
};