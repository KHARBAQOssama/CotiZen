const Appartement = require("../models");
const {
  appartementAddValidation: AddValidation,
  updateAppartementValidation: updateValidation,
} = require("../helper");

const getAll = async (req, res) => {
  try {
    const apartments = await Appartement.aggregate([
      {
        $addFields: {
          unpaidInvoicesCount: {
            $size: {
              $filter: {
                input: "$invoices",
                as: "invoice",
                cond: { $eq: ["$$invoice.status", "unpaid"] },
              },
            },
          },
          partiallyPaidInvoicesCount: {
            $size: {
              $filter: {
                input: "$invoices",
                as: "invoice",
                cond: { $eq: ["$$invoice.status", "partially_paid"] },
              },
            },
          },
        },
      },
      {
        $project: {
          invoices: 0,
        },
      },
    ]);

    return res.status(200).json({ apartments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving appartements!" });
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
    residentsHistory,
    invoices,
  } = req.body;

  try {
    const newAppartement = new Appartement({
      number,
      address,
      status,
      monthlyPayment,
      residentsHistory,
      invoices,
    });

    await newAppartement.save();

    return res.status(201).json({
      message: "Appartement added successfully!",
      appartement: {
        id: newAppartement._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error adding appartement!",
    });
  }
};

const update = async (req, res) => {
  const { appartement: id } = req.params;
  const updateData = req.body;
  const errors = await updateValidation.validateAsync(updateData, {
    abortEarly: false,
  });
  if (errors.error) return res.status(400).json(errors);

  try {
    const appartement = await Appartement.findById(id);

    if (!appartement) {
      return res.status(404).json({ message: "Appartement not found" });
    }

    appartement.set(updateData);
    await appartement.save();

    return res
      .status(200)
      .json({ message: "Appartement updated successfully!", appartement });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating appartement!" });
  }
};

const deleteA = async (req, res) => {
  const { appartement: id } = req.params;

  try {
    const deletedAppartement = await Appartement.findByIdAndDelete(id);
    if (!deletedAppartement) {
      return res.status(404).json({ message: "Appartement not found" });
    }

    return res
      .status(200)
      .json({ message: "Appartement deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting appartement!" });
  }
};

const show = async (req, res) => {
  const { appartement: id } = req.params;

  try {
    const appartement = await Appartement.findById(id);

    if (!appartement) {
      return res.status(404).json({ message: "Appartement not found" });
    }

    return res.status(200).json({ appartement });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving appartement!" });
  }
};

const updateApartmentStatus = async (req, res) => {
  const { status } = req.body;

  if (!status)
    return res.status(400).json({ message: "Status field is required" });

  const { appartement: id } = req.params;

  try {
    const appartement = await Appartement.findById(id);

    if (!appartement) {
      return res.status(404).json({ message: "Appartement not found" });
    }

    if (status == "available") {
      const lastResident =
        appartement.residentsHistory[appartement.residentsHistory.length - 1];
      console.log(lastResident);
      if (!lastResident.endDate) lastResident.endDate = new Date();
      appartement.status = status;
    } else if (status == "in_maintenance") {
      if (appartement.status == "occupied")
        return res
          .status(400)
          .json({ message: "cannot maintain an occupied apartment" });
      else appartement.status = status;
    } else if (status == "occupied") {
      if (appartement.status != "available")
        return res
          .status(400)
          .json({ message: "cannot occupy unavailable apartment" });
      else {
        const { resident } = req.body;
        appartement.residentsHistory.push(resident);
        appartement.status = status;
      }
    }
    await appartement.save();
    return res.status(200).json({ appartement });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving appartement!" });
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
