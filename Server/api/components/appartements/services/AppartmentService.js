const Apartment = require("../models");
const {
  apartmentSchema: AddValidation,
  updateApartmentSchema: updateValidation,
} = require("../helper");

const getAll = async (req, res) => {
  try {
   const apartments = await Apartment.aggregate([
     {
       $lookup: {
         from: "invoices",
         localField: "invoices",
         foreignField: "_id",
         as: "invoices",
       },
     },
     {
       $unwind: {
         path: "$residentsHistory",
         preserveNullAndEmptyArrays: true,
       },
     },
     {
       $sort: {
         "residentsHistory.endDate": -1,
       },
     },
     {
       $group: {
         _id: "$_id",
         number: { $first: "$number" },
         address: { $first: "$address" },
         status: { $first: "$status" },
         monthlyPayment: { $first: "$monthlyPayment" },
         lastResident: { $first: "$residentsHistory" },
         invoices: { $push: "$invoices" },
       },
     },
   ]);
    
    return res.status(200).json({ apartments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving apartments!" });
  }
};

const create = async (req, res) => {
  const errors = await AddValidation.validateAsync(req.body, {
    abortEarly: false,
  });

  if (errors.error) {
    return res.status(400).json({ errors: errors.error });
  }

  const {
    number,
    address,
    status,
    monthlyPayment,
  } = req.body;

  try {
    const newApartment = new Apartment({
      number,
      address,
      status,
      monthlyPayment,
    });

    await newApartment.save();

    return res.status(201).json({
      message: "Apartment added successfully!",
      apartment: {
        id: newApartment._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error adding apartment!",
    });
  }
};

const update = async (req, res) => {
  const { apartment: id } = req.params;
  console.log(id)
  const updateData = req.body;
  const errors = await updateValidation.validateAsync(updateData, {
    abortEarly: false,
  });
  if (errors.error) return res.status(400).json(errors);

  try {
    const apartment = await Apartment.findById(id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    if(updateData.newResident) apartment.residentsHistory.push(updateData.newResident);
    apartment.set(updateData);
    await apartment.save();

    return res
      .status(200)
      .json({ message: "Apartment updated successfully!", apartment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating apartment!" });
  }
};

const deleteA = async (req, res) => {
  const { apartment: id } = req.params;

  try {
    const deletedApartment = await Apartment.findByIdAndDelete(id);
    if (!deletedApartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    return res
      .status(200)
      .json({ message: "Apartment deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting apartment!" });
  }
};

const show = async (req, res) => {
  const { apartment: id } = req.params;

  try {
    const apartment = await Apartment.findById(id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    return res.status(200).json({ apartment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving apartment!" });
  }
};

const updateApartmentStatus = async (req, res) => {
  const { status } = req.body;

  if (!status)
    return res.status(400).json({ message: "Status field is required" });

  const { apartment: id } = req.params;

  try {
    const apartment = await Apartment.findById(id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    if (status == "available") {
      const lastResident =
        apartment.residentsHistory[apartment.residentsHistory.length - 1];
      console.log(lastResident);
      if (!lastResident.endDate) lastResident.endDate = new Date();
      apartment.status = status;
    } else if (status == "in_maintenance") {
      if (apartment.status == "occupied")
        return res
          .status(400)
          .json({ message: "cannot maintain an occupied apartment" });
      else apartment.status = status;
    } else if (status == "occupied") {
      if (apartment.status != "available")
        return res
          .status(400)
          .json({ message: "cannot occupy unavailable apartment" });
      else {
        const { resident } = req.body;
        apartment.residentsHistory.push(resident);
        apartment.status = status;
      }
    }
    await apartment.save();
    return res.status(200).json({ apartment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving apartment!" });
  }
};

module.exports = {
  create,
  update,
  deleteA,
  show,
  getAll,
  updateApartmentStatus,
};
