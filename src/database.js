const mongoose = require('mongoose');

//localhost: 127:0.0.1
mongoose.connect('mongodb://127.0.0.1:27017/healthie')
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
