const Apartment = require("../models");
const Invoice = require("../../invoices/models");
const Payment = require("../../payments/models");
const {
  apartmentSchema: AddValidation,
  updateApartmentSchema: updateValidation,
} = require("../helper");

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const number = req.query.number || "";
  const status = req.query.status || "";

  try {
    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (number) {
      query.number = { $regex: number, $options: "i" };
    }
    if (status) {
      query.status = status;
    }
    const apartments = await Apartment.find(
      query,
      "number address status residentsHistory monthlyPayment"
    )
      .populate({
        path: "invoices",
        match: { status: "unpaid" },
        options: { select: "_id" },
      })
      .skip(skip)
      .limit(limit)
      .exec();

    const apartmentsWithUnpaidInvoicesCount = await Promise.all(
      apartments.map(async (apartment) => {
        const unpaidInvoices = await Invoice.countDocuments({
          _id: { $in: apartment.invoices },
          status: "unpaid",
        });

        return {
          ...apartment.toObject(),
          unpaidInvoicesCount: unpaidInvoices,
        };
      })
    );

    return res
      .status(200)
      .json({ apartments: apartmentsWithUnpaidInvoicesCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving apartments!" });
  }
};

const getApartments = async (req,res) => {
  const apartments = await Apartment.find().populate({
    path: "invoices",
    populate: {
      path: "payments",
      model: "Payment",
    },
  });
  res.status(200).json({apartments})
}

const create = async (req, res) => {
  const errors = await AddValidation.validateAsync(req.body, {
    abortEarly: false,
  });

  if (errors.error) {
    return res.status(400).json({ message: errors.error });
  }

  const { number, address, status, monthlyPayment } = req.body;

  try {
    const newApartment = new Apartment({
      number,
      address,
      status,
      monthlyPayment,
    });

    await newApartment.save();

    return res.status(201).json({
      message: { type: "success", content: "Apartment added successfully!" },
      apartment: {
        id: newApartment._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: { type: "error", content: "Error adding apartment!" },
    });
  }
};

// const update = async (req, res) => {
//   const { apartment: id } = req.params;
//   const updateData = req.body;

//   try {
//     const errors = await updateValidation.validateAsync(updateData, {
//       abortEarly: false,
//     });
//     if (errors.error) return res.status(400).json(errors);

//     const apartment = await Apartment.findById(id);
//     if (!apartment) {
//       return res.status(404).json({ message: "Apartment not found" });
//     }

//     let lastResident = apartment.residentsHistory[
//       apartment.residentsHistory.length - 1
//     ] || {
//       name: null,
//       phoneNumber: null,
//       email: null,
//       nationalId: null,
//     };

//     if (updateData.status !== "occupied" && apartment.status === "occupied") {
//       if (!lastResident.endDate) {
//         lastResident.endDate = new Date();
//       }
//     } else if (
//       updateData.status === "occupied" &&
//       apartment.status !== "occupied"
//     ) {
//       if (!lastResident.endDate) {
//         lastResident.endDate = new Date();
//       }
//       apartment.residentsHistory.push(updateData.resident);
//     } else {
//       Object.assign(lastResident, updateData.resident);
//     }

//     delete updateData.resident;

//     Object.assign(apartment, updateData);
//     apartment.residentsHistory[apartment.residentsHistory.length - 1] =
//       lastResident;

//     await apartment.save();

//     return res
//       .status(200)
//       .json({
//         message: {
//           type: "success",
//           content: "Apartment updated successfully!",
//         },
//         apartment,
//       });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Error updating apartment!" });
//   }
// };
const update = async (req, res) => {
  const { apartment: id } = req.params;
  const updateData = req.body;

  try {
    const errors = await updateValidation.validateAsync(updateData, {
      abortEarly: false,
    });
    if (errors.error) return res.status(400).json(errors);

    const apartment = await Apartment.findById(id);
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    let lastResidentIndex = apartment.residentsHistory.length - 1;
    let lastResident = apartment.residentsHistory[lastResidentIndex];

    if (updateData.status !== "occupied" && apartment.status === "occupied") {
      if (lastResident && !lastResident.endDate) {
        apartment.residentsHistory[lastResidentIndex].endDate = new Date();
      }
    } else if (
      updateData.status === "occupied" &&
      apartment.status !== "occupied"
    ) {
      if (lastResident && !lastResident.endDate) {
        apartment.residentsHistory[lastResidentIndex].endDate = new Date();
      }

      apartment.residentsHistory.push(updateData.resident);
    } else if (
      updateData.status === "occupied" &&
      apartment.status === "occupied"
    ) {
      Object.assign(
        apartment.residentsHistory[lastResidentIndex],
        updateData.resident
      );
    }

    delete updateData.resident;
    delete updateData.residentsHistory;

    Object.assign(apartment, updateData);

    await apartment.save();


    return res.status(200).json({
      message: {
        type: "success",
        content: "Apartment updated successfully!",
      },
      apartment,
    });
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

    return res.status(200).json({ message: "Apartment deleted successfully!" });
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
  getApartments
};