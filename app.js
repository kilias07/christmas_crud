const express = require('express');
require('express-async-errors');
const methodOverride = require('method-override');
const {engine} = require('express-handlebars');
const {handleError} = require("./utils/error");
const {homeRouter} = require("./routes/home");
const {childRouter} = require("./routes/child");
const {giftRouter} = require("./routes/gift");
require('./utils/db.js');
const {handlebarsHelper} = require("./utils/handlebars-helper");



const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
// app.use(express.json());
app.engine('.hbs', engine({
    extname: 'hbs',
    helpers: handlebarsHelper,
}));
app.set('view engine', '.hbs');


app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);
app.listen(3001, () => console.log('app is running on port 3001'));