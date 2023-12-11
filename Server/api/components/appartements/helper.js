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

module.exports = { appartementAddValidation, updateAppartementValidation };