const validate = (schema) => (req, res, next) => {

  try {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next()
  } catch (error) {
    res.status(500).json({
      "message": "Internal server Error"
    })
  }
}


module.exports = validate