const { default: mongoose } = require("mongoose");
const config = require("../config");
const url = config.mongo_url.replace("<db_password>", config.mongo_pass)
const mongoDbConnnection = async () => {
  try {
    await mongoose.connect(url)
    console.log("Mongo Connected");
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = mongoDbConnnection