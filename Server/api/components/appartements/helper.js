const Joi = require("joi");
const mongoose = require("mongoose");
const Apartment = require("./models/");
const Invoice = require("../invoices/models");

const residentSchema = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  nationalId: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  startDate: Joi.date().allow(null),
  endDate: Joi.date().allow(null),
});

const apartmentSchema = Joi.object({
  number: Joi.string().required(),
  address: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid("available", "occupied", "in_maintenance"),
  residentsHistory: Joi.array().items(residentSchema),
  monthlyPayment: Joi.number().required(),
  invoices: Joi.array().items(Joi.string().hex().length(24)),
});

const updateApartmentSchema = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  number: Joi.string(),
  address: Joi.string(),
  status: Joi.string().valid("available", "occupied", "in_maintenance"),
  resident: residentSchema,
  residentsHistory: Joi.array().items(residentSchema),
  monthlyPayment: Joi.number(),
  invoices: Joi.array().items(Joi.string().hex().length(24)),
});

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
        $lookup: {
          from: "invoices",
          localField: "invoices",
          foreignField: "_id",
          as: "invoices",
        },
      },
      {
        $match: {
          invoices: {
            $not: {
              $elemMatch: {
                month: currentMonth,
              },
            },
          },
        },
      },
    ]);

    await Promise.all(
      apartmentsWithoutInvoice.map(async (apartment) => {
        const invoice = new Invoice({
          month: currentMonth,
          amount: apartment.monthlyPayment,
          status: "unpaid",
        });
        invoice.apartment = apartment
        await invoice.save();
        
        await Apartment.findByIdAndUpdate(
          apartment._id,
          { $push: { invoices: invoice._id } },
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
  apartmentSchema,
  updateApartmentSchema,
  generateInvoicesForApartments,
};
