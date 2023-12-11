const Joi = require("joi");
const appartementAddValidation = Joi.object({
  ownerInfo: Joi.object({
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    name: Joi.string().required(),
  }).required(),
  address: Joi.string().required(),
  details: Joi.object({
    rooms: Joi.number().integer(),
    surface: Joi.number().integer(),
    floorNumber: Joi.number().integer(),
    yearBuilt: Joi.number().integer(),
  }),
  status: Joi.string()
    .required()
    .valid("occupied", "in_maintenance", "available"),
  utilities: Joi.array().items(Joi.string()),
  description: Joi.string().required(),
});

const updateAppartementValidation = Joi.object({
  ownerInfo: Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    name: Joi.string(),
  }).or("email", "phoneNumber", "name"), // At least one of these is required

  address: Joi.string(),

  details: Joi.object({
    rooms: Joi.number().integer(),
    surface: Joi.number().integer(),
    floorNumber: Joi.number().integer(),
    yearBuilt: Joi.number().integer(),
  }),

  status: Joi.string().valid("occupied", "in_maintenance", "available"),

  utilities: Joi.array().items(Joi.string()),

  description: Joi.string(),
});

module.exports = { appartementAddValidation, updateAppartementValidation };
