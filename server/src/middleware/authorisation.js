const checkRole = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" })
    }
    next()
  } catch (error) {
    res.status(500).json({
      message: "Interal server error",
      error: error.message
    })
  }
}

module.exports = checkRole;