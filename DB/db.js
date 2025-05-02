const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(
    "mongodb+srv://AbdulAleem:qaK30MkDaJBeJxgn@namastenode.2dq6g.mongodb.net/Eccomerce"
  );
};


module.exports = connectDatabase;