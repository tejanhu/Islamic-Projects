const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Mudarris = require('./models/mudarris');

mongoose.connect('mongodb://127.0.0.1/mudarris',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB CONNECTED!");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));

// Allows us to use HTTP methods such as DELETE and PUT/PATCH
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/mudarrisoon', async (req, res) => {
   const mudarrisoon = await Mudarris.find({});
   res.render('mudarrisoon/index', {mudarrisoon});
});

app.get('/mudarrisoon/new', (req, res) => {
    res.render('mudarrisoon/new');
});

app.post('/mudarrisoon', async(req, res) => {
   const mudarris = new Mudarris(req.body.mudarris);
   await mudarris.save();
   res.redirect(`/mudarrisoon/${mudarris._id}`);
});

app.get('/mudarrisoon/:id', async(req, res) => {
    const mudarris = await Mudarris.findById(req.params.id);
    res.render('mudarrisoon/show', {mudarris});
});

app.get('/mudarrisoon/:id/edit', async(req, res) => {
    const mudarris = await Mudarris.findById(req.params.id);
    res.render('mudarrisoon/edit', {mudarris});
});

app.put('/mudarrisoon/:id', async(req, res) => {
   const {id} = req.params;
   const mudarris = await Mudarris.findByIdAndUpdate(id, { ...req.body.mudarris  });
   res.redirect(`/mudarrisoon/${mudarris._id}`);
});

app.delete('/mudarrisoon/:id', async(req, res) => {
    const {id} = req.params;
    await Mudarris.findByIdAndDelete(id);
    res.redirect('/mudarrisoon');
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});