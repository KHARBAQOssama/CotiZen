const Appartement = require("../models");
const {
  appartementAddValidation: AddValidation,
  updateAppartementValidation: updateValidation,
} = require("../helper");

const getAll = async (req, res) => {
  try {
    const appartements = await Appartement.find({});
    return res.status(200).json({ appartements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving appartements!" });
  }
};

const create = async (req, res) => {
  const errors = await AddValidation.validateAsync(req.body, {
    abortEarly: false,
  });

  if (errors.error) {
    return res.status(400).json({ errors: errors.error });
  }

  const { ownerInfo, address, details, status, utilities, description } =
    req.body;

  try {
    const newAppartement = new Appartement({
      ownerInfo,
      address,
      details,
      status,
      utilities,
      description,
    });

    await newAppartement.save();

    res.status(201).json({
      message: "Appartement added successfully!",
      appartement: {
        id: newAppartement._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
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
    res.status(500).json({ message: "Error updating appartement!" });
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
    res.status(500).json({ message: "Error deleting appartement!" });
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
    res.status(500).json({ message: "Error retrieving appartement!" });
  }
};

module.exports = {
  create,
  update,
  deleteA,
  show,
  getAll,
};
