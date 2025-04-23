import ApiResponse from "../utils/apiResponse.js";

export const validateUnis = (req, res, next) => {
  if (req.method === 'PUT') { // Only applicable for PUT method
    const cols = req.body;

    // Remove sensitive fields from the request body
    delete cols?.id;
    delete cols?.code;

    // If the request body contains certain forbidden fields, reject the request
    const forbiddenFields = ['id', 'code']; // Define fields that shouldn't be updated
    const requestKeys = Object.keys(cols);

    // Check if any forbidden fields are included in the request body
    const invalidFields = requestKeys.filter(key => forbiddenFields.includes(key));
    if (invalidFields.length > 0) {
      return ApiResponse.unauthorized(res, "Cannot update forbidden fields");
    }

    req.body = cols; // Set the updated request body
  }

  next(); // Proceed to the next middleware or route handler
};
