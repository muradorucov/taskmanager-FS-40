const express = require("express");
const config = require("./src/config");
const mongoDbConnnection = require("./src/db");
const routers = require("./src/routers");
const cookieParser = require("cookie-parser");
const limiterMiddle = require("./src/middleware/limitter");
const { logger } = require("./src/utils/logger");

const cors = require("cors")
const app = express();
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,               
}));


app.use(limiterMiddle(15, 100))
mongoDbConnnection();




app.use(express.json())
app.use(cookieParser());


app.use("/api/v1", routers)




app.listen(config.port, () => {
  console.log("Server is runnnnnnnn.....");
})