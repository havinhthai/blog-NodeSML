const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { port, dbUrl } = require('./config/config'); // { port: 3000 }
const routers = require('./routers');

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);
mongoose.connection.on('error', (err) => {
    console.log('Lỗi kết nối đến CSDL: ' + err);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('dev'));

app.use('/public', express.static('./public'));

app.use(routers);

app.listen(port, (err) => {
    if (err) {
        console.log(`> Error: ${err}`);
        return;
    }

    console.log(`Server running on port ${port}`);
});
