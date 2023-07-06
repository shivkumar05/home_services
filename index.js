const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./src/Routes/route");
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;


//************************ [Database Connection] ************ */
mongoose
  .connect(
    "mongodb+srv://Home_Services:rN88DanuXqrjo8dp@cluster0.tq3csvf.mongodb.net/Home_Services",{useNewUrlParser: true,useUnifiedTopology: true}
  )
  .then(() => console.log("Database is connected successfully.."))
  .catch((Err) => console.log(Err));

app.use("/", router);

app.listen(port, function () {
  console.log(`Server is connected on Port ${port} ✅✅✅`);
});

//rN88DanuXqrjo8dp