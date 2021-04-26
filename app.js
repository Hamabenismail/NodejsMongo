const express = require('express');

const app = express();

const mongoose = require('mongoose');

const cors = require('cors');


require('dotenv/config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');
//Middlewares 

app.use('/posts',postRoutes);
app.use('/user',userRoutes);
app.use('/tasks',taskRoutes);
//ROUTES
app.get('/',(req,res) => {
    res.status(200).send('Here we are ! ');
});

//CONNECT TO DB

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
);


app.listen(3000);