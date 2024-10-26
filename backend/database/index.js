const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
    }
  );
  
  const con = mongoose.connection;
  
  con.on("open", () => {
    console.log("DB SuccessFully Connected...");
  });