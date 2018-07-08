const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const { port, dbUrl, sessionSecret } = require('./config/config'); // { port: 3000 }
const routers = require('./routers');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', (err) => {
    console.log('Lỗi kết nối đến CSDL: ' + err);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('dev'));
app.use(compression({ level: 6 })); // gzip
app.use(helmet()); // security
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    name: 'blogSML',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.DB_URL }),
}));
app.use(flash());

app.use('/public', express.static('./public'));

app.use(routers);

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`> Error: ${err}`);
        return;
    }

    console.log(`Server running on port ${process.env.PORT}`);
});
