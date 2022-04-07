const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/my_database",{
    dbName: 'my_database',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log("Not Connected!") : 
    console.log('Connection successful!'));