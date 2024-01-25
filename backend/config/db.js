const mongoose = require('mongoose');
const connectDB = async() => {
    const URL = process.env.MONGO_URL;
    try {
        const conn = await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    console.log("MongoDB Connected:"+ conn.connection.host);
    } catch (err) {
        process.exit();
    }
}

module.exports = connectDB;