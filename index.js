const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const listRouter = require('./routes/listRouter');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const PORT = 8000;
const DB_URL = 'mongodb+srv://Alesia:12345678Da@cluster0.t7plh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}));
app.use('/auth', authRouter);
app.use('/list', listRouter);
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: false }));

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => console.log('Server working on the PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
};

startApp();
