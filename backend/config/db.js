const mongoose = require("mongoose");
const dns = require("dns");

// Force a public DNS resolver for SRV lookups in environments where the default
// resolver refuses MongoDB Atlas SRV queries.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
   // console.log("URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.log("Error Name:", error.name);
    console.log("Error Message:", error.message);
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;