const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, subjects} = require('../seeds/seedHelpers');
const Mudarris = require('../models/mudarris');

mongoose.connect('mongodb://127.0.0.1/mudarris',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB CONNECTED!");
});

// Pass an array and return a random element from the array
const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Mudarris.deleteMany({});
   for(let index = 0; index<50; index++){
    const random1000 = Math.floor(Math.random() * 1000);
    const muddaris = new Mudarris({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        subject: `${sample(subjects)}`,
        description: `${sample(descriptors)}`,
        image: 'https://source.unsplash.com/collection/483251',
        name: 'Ustadh Mohammed',
        fee: 50
    });
    await muddaris.save();
   }
}

seedDB().then(() => {
    mongoose.connection.close();
});