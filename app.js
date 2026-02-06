require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRoutes = require('./Router/authRoutes');
const recipeRoutes = require('./Router/recipeRoutes');
const commentRoutes = require('./Router/commentRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/', authRoutes);
app.use('/recipe', recipeRoutes);
app.use('/comments', commentRoutes);

app.get('/', (req, res) => res.redirect('/recipe'));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
