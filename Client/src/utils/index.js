const todayDate = ()=>{
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
     
    return formattedDate;
}

export default{
    todayDate,
}