const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const User = require('./models/User');
const cors = require('cors');

const PORT = 8000;
const DB_URL = 'mongodb+srv://Alesia:12345678Da@cluster0.t7plh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express();

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}));
app.use('/auth', authRouter);


// app.post('/', async (req, res) => {
//     const { username, password } = req.body;
//    //  const user = await User.create({username, password, role});
//     const user = await User.findOne({ username });
//     if (!user) {
//         return res.status(400).json({message: `Пользователь ${username} не найден`});
//     }
//     if (password !== user.password) {
//         return res.status(400).json({message: `Введен неверный пароль`});
//     }
//     console.log(req.body);
//     res.status(200).json(user);
// });

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => console.log('Server working on the PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
};

startApp();
