const authSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email', // Enforcing proper email format
    },
    country_code: {
      type: 'string',
      pattern: '^[+][0-9]*$', // Ensuring country_code starts with '+' followed by digits
    },
    phone: {
      type: 'string',
      pattern: '^[0-9]{10,15}$', // Phone number validation for 10 to 15 digits
    },
    password: {
      type: 'string',
      minLength: 6, // Ensuring password has a minimum length
    },
  },
  required: ['email', 'phone', 'password'], // Making these fields mandatory
  additionalProperties: false, // Prevent additional properties
};

export { authSchema };
