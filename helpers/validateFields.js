const { validationResult } = require("express-validator");
const httpStatus = require("../helpers/httpStatus");

const  validateFields=(req, res, next)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
  } else {
    next();
  }
}

// const validateFields = (req, res, next) => {
//   try {
//     validationResult(req).throw()
//     return next()
//   } catch (err) {
//     res.status(403)
//     res.send({ errors: err.array() })
//   }
// }

module.exports = {validateFields};