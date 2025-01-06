const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

(async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    // console.log("Database URL:", process.env.DATABASE_URL);

    const connection = await mongoose.connect(process.env.DATABASE_URL);

    console.log(
      "MongoDB connection established and the host is : ",
      connection.connection.host
    );

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(
        `Express app is connected to SAND ONE & listening on port ${port}`
      );
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
})();
