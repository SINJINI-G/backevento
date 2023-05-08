const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`[+] MongoDB is connected!`);
  })
  .catch((e) => {
    console.log(`[x] Connection failed! ${e}`);
  });
