const { default: mongoose } = require("mongoose");

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  token: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
