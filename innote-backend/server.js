require('dotenv').config();
const path = require('path'); //For Static Serve
const express = require("express");
require("colors"); //For Change Color
const bodyParser = require('body-parser');


const router = require('./routes/routes');
// const authrouter = require('./routes/auth.routes');
// const productsAndCtegories = require('./routes/products-ctegories.routes');
// const cartsAndCheckouts = require('./routes/carts-checkout.routes');
// const { errorHandler } = require('./helper/errorHandler');
const cors = require('cors');
const passport = require("passport");//

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use('', (_, res, next) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(express.static(path.join(__dirname, 'images'))); //for Image Static Serve
app.use(express.static(path.join(__dirname, 'resources'))); //for Image Static Serve

//All Routes:
// app.use(router);//Regutar Routes
// app.use("/auth", authrouter);//Protected Routes
// app.use("/products-categories", productsAndCtegories);//For Product & Categories Routes
// app.use(`/auth/${process.env.API_VERSION}`,passport.authenticate("jwt", { session: false }), cartsAndCheckouts);//For Carts & Checkouts Routes
// const userProfile = require('./routes/profile.routes');
// app.use(`/auth/me/${process.env.API_VERSION}`,passport.authenticate("jwt", { session: false }), userProfile);//For User-Profile Routes)
// app.use(errorHandler);
// app.use(passport.initialize());//
// app.use(passport.session());//


app
    .get('/', (req, res) => {
        res.send('server is running..')
    })
    .listen(process.env.PORT || 3000, () => {
        console.log("successfully connected to the server..")
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT || 3000}`.yellow.bold);
    })

// app.get('/api/getkey', (req, res) => {
//     res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
// });