const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sanjanatalaviya:sanjanaom2264@cluster0.1adlg1j.mongodb.net/ecommerce')
            .then(() => { console.log('MongoDB is connected successfully.') })
            .catch((error) => { console.log('MongoDB is connectection error.' + error) })
    } catch (error) {
        console.log('MongoDB is connectection error.' + error)
    }
}

module.exports = connectDB;