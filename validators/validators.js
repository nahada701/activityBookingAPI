const Joi = require('joi');

// registration validation
exports.registerValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10}$/).required().messages({
    "string.pattern.base": "Phone number must be 10 digits"
  }),
  password: Joi.string().min(6).required()
});

// login validation
exports.loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// add activity validation
exports.addActivityValidation = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(5).max(200).required(),
  location: Joi.string().min(3).required(),
  dateTime: Joi.date().iso().required().messages({
    "date.format": "Date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)"
  })
});

// book activity validation
exports.bookActivityValidation = Joi.object({
  activityId: Joi.string().length(24).hex().required().messages({
    "string.length": "Activity ID must be a valid 24-character MongoDB ObjectId"
  })
});
