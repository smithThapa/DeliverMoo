const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const itemsRouter = require('./routers/itemsRouter');
const ordersRouter = require('./routers/ordersRouter');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });

dotenv.config({path: './config.env'});

const app = express();

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})

app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/v1', itemsRouter );
app.use('/api/v1', ordersRouter);





