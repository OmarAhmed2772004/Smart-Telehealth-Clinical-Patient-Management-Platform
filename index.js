const mongoose = require("mongoose");
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose.connect(
    "mongodb+srv://lujainahmed459_db_user:eSwQu9jFNC9DcuS8@cluster0.whlhfwe.mongodb.net/telehealth?retryWrites=true&w=majority&appName=Cluster0"
)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));