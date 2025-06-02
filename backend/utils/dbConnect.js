const mongoose = require('mongoose');

const connection = {
  isConnected: 0 // Start as not connected
};

async function dbConnect() {
  console.log(connection);
  
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
}

module.exports = dbConnect;