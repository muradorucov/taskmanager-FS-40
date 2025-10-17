require("dotenv").config()


const config = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  mongo_url: process.env.MONGO_URL,
  mongo_pass: process.env.MONGO_PASS,
  refresh_secret: process.env.REFRESH_SECRET,
  reset_secret: process.env.RESET_SECRET,
  access_secret: process.env.ACCESS_SECRET,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS

}


module.exports = config