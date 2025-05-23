import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required(),
  email: Joi.string().email().optional().allow(null),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .optional(),
});
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required(),
  email: Joi.string().email().optional().allow(null),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .optional(),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');

// const validationReesult = createContactSchema.validate(dataToValidate);
// if (validationReesult.error) {
//   console.error(validationReesult.error.message);
// } else {
//   console.log('Data is Valid!');
// }
