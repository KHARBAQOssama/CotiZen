const Joi = require("joi");
const appartementAddValidation = Joi.object({
  number: Joi.string().required(),
  address: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid("occupied", "in_maintenance", "available"),
  residentsHistory: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      nationalId: Joi.string(),
      phoneNumber: Joi.string(),
      startDate: Joi.date().required(),
      endDate: Joi.date(),
    })
  ),
  monthlyPayment: Joi.number().required(),
  invoices: Joi.array().items(
    Joi.object({
      month: Joi.string()
        .regex(/^\d{4}-\d{2}$/)
        .required(),
      amount: Joi.number().required(),
      status: Joi.string().valid("paid", "partially_paid", "unpaid").required(),
    })
  ),
});

const updateAppartementValidation = Joi.object({
  number: Joi.string(),
  address: Joi.string(),
  status: Joi.string().valid("occupied", "in_maintenance", "available"),
  residentsHistory: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      nationalId: Joi.string(),
      phoneNumber: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
  ),
  monthlyPayment: Joi.number(),
  invoices: Joi.array().items(
    Joi.object({
      month: Joi.string().regex(/^\d{4}-\d{2}$/),
      amount: Joi.number(),
      status: Joi.string().valid("paid", "partially_paid", "unpaid"),
    })
  ),
});

const mongoose = require("mongoose");
const Apartment = require("./models/");

const generateInvoicesForApartments = async () => {
  try {
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    const apartmentsWithoutInvoice = await Apartment.aggregate([
      {
        $match: {
          "invoices.month": {
            $ne: currentMonth,
          },
        },
      },
      {
        $project: {
          number: 1,
          monthlyPayment: 1,
        },
      },
    ]);

    await Promise.all(
      apartmentsWithoutInvoice.map(async (apartment) => {
        const invoice = {
          month: currentMonth,
          amount: apartment.monthlyPayment,
          status: "unpaid",
        };

        await Apartment.findByIdAndUpdate(
          apartment._id,
          { $push: { invoices: invoice } },
          { new: true }
        );
      })
    );

    console.log("Invoices generated successfully.");
  } catch (error) {
    console.error("Error generating invoices:", error);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = {
  appartementAddValidation,
  updateAppartementValidation,
  generateInvoicesForApartments,
};
