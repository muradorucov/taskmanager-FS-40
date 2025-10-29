const validate = (schema) => (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // errors obyekt formatında yığılır
      const errors = {};
      error.details.forEach((err) => {
        const field = err.context.key;
        errors[field] = err.message.replace(/['"]/g, "");
      });

      return res.status(400).json(errors);
    }

    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = validate;
